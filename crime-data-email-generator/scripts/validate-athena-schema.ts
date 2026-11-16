import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import hcl from 'hcl2-parser'
import { parse } from 'csv-parse/sync'

const terraformUrl =
  'https://raw.githubusercontent.com/ministryofjustice/cloud-platform-environments/main/namespaces/live.cloud-platform.service.justice.gov.uk/hmpps-electronic-monitoring-crime-matching-dev/resources/athena.tf'

const files = {
  position: 'positions.csv',
  device_activations: 'device_activations.csv',
  caseload: 'caseload.csv',
  orders_activations_positions: 'orders_activations_positions.csv',
}

type TerraformColumn = { name?: unknown }
type TerraformTable = {
  name?: string
  storage_descriptor?: Array<{ columns?: TerraformColumn[] }>
}
type TerraformDefinition = {
  resource?: { aws_glue_catalog_table?: Record<string, TerraformTable[]> }
}

export default async function validateAthenaSchema(terraform: string, outputDirectory: string): Promise<void> {
  const [definition, error] = hcl.parseToObject(terraform) as [TerraformDefinition | null, unknown]
  if (!definition || error) {
    throw new Error('Cannot parse Athena Terraform; validation requires valid HCL')
  }

  const tables = Object.values(definition.resource?.aws_glue_catalog_table ?? {}).flat()
  const inputs = await Promise.all(
    Object.entries(files).map(async ([tableName, filename]) => ({
      tableName,
      filename,
      content: await readFile(join(outputDirectory, filename), 'utf8'),
    })),
  )
  for (const { tableName, filename, content } of inputs) {
    const matches = tables.filter(table => table.name === tableName)
    if (matches.length !== 1) {
      throw new Error(`${filename}: expected exactly one Terraform table named ${tableName}`)
    }

    const descriptors = matches[0].storage_descriptor
    const columns = descriptors?.[0]?.columns
    if (descriptors?.length !== 1 || !columns?.length) {
      throw new Error(`${filename}: expected explicit Terraform storage_descriptor columns`)
    }
    const expected = columns.map(column => {
      if (typeof column.name !== 'string') {
        throw new Error(`${filename}: expected explicit Terraform storage_descriptor columns`)
      }
      return column.name
    })
    if (new Set(expected).size !== expected.length) {
      throw new Error(`${filename}: duplicate Terraform column names`)
    }

    const rows = parse(content, {
      bom: true,
      relax_column_count: true,
    })
    const [header, ...records] = rows
    if (!header || header.length !== expected.length || header.some((name, index) => name !== expected[index])) {
      throw new Error(
        `${filename}: columns differ from Terraform (including order)\nExpected: ${expected.join(',')}\nReceived: ${header?.join(',') ?? '(empty file)'}`,
      )
    }
    if (records.length === 0) {
      throw new Error(`${filename}: expected at least one data row`)
    }
    for (const [index, record] of records.entries()) {
      if (record.length !== expected.length) {
        throw new Error(`${filename}: record ${index + 2} has ${record.length} fields; expected ${expected.length}`)
      }
    }
    console.log(`${filename}: validated ${expected.length} columns and ${records.length} data rows`)
  }
}

async function main() {
  const localFile = process.env.ATHENA_TERRAFORM_FILE
  let terraform: string
  if (localFile) {
    console.log(`Validating against Terraform file: ${localFile}`)
    terraform = await readFile(localFile, 'utf8')
  } else {
    console.log(`Validating against Cloud Platform main: ${terraformUrl}`)
    const response = await fetch(terraformUrl, { signal: AbortSignal.timeout(30_000) })
    if (!response.ok) {
      throw new Error(`Cannot fetch Athena Terraform: HTTP ${response.status}`)
    }
    terraform = await response.text()
  }
  await validateAthenaSchema(terraform, 'output')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(`Athena schema validation failed: ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  })
}
