import hcl from 'hcl2-parser'
import { parse } from 'csv-parse/sync'

const files = {
  position: 'position/position.csv',
  device_activations: 'device_activations/device_activations.csv',
  caseload: 'caseload/caseload.csv',
  orders_activations_positions: 'orders_activations_positions/orders_activations_positions.csv',
}
type TableName = keyof typeof files
type CsvContents = Partial<Record<TableName, string>>

type TerraformColumn = { name?: unknown }
type TerraformTable = {
  name?: string
  storage_descriptor?: Array<{ columns?: TerraformColumn[] }>
}
type TerraformDefinition = {
  resource?: { aws_glue_catalog_table?: Record<string, TerraformTable[]> }
}

export default function validateAthenaSchema(terraform: string, csvContents: CsvContents): void {
  const [definition, error] = hcl.parseToObject(terraform) as [TerraformDefinition | null, unknown]
  if (!definition || error) {
    throw new Error('Cannot parse Athena Terraform; validation requires valid HCL')
  }

  const tables = Object.values(definition.resource?.aws_glue_catalog_table ?? {}).flat()
  for (const [tableName, filename] of Object.entries(files) as Array<[TableName, string]>) {
    const content = csvContents[tableName]
    if (content === undefined) {
      throw new Error(`${filename}: missing CSV content`)
    }

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
  }
}
