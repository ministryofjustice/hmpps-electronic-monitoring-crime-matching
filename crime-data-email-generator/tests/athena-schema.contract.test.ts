import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test, type TestContext } from 'node:test'
import validateAthenaSchema from './athena-schema.ts'

const terraformUrl =
  'https://raw.githubusercontent.com/ministryofjustice/cloud-platform-environments/main/namespaces/live.cloud-platform.service.justice.gov.uk/hmpps-electronic-monitoring-crime-matching-dev/resources/athena.tf'

const tables = ['position', 'device_activations', 'caseload', 'orders_activations_positions']
const files = ['positions.csv', 'device_activations.csv', 'caseload.csv', 'orders_activations_positions.csv']
const terraform = tables
  .map(
    name => `
resource "aws_glue_catalog_table" "${name}" {
  name = "${name}"
  storage_descriptor {
    columns {
      name = "id"
      type = "bigint"
    }
    columns {
      name = "description"
      type = "string"
    }
  }
}`,
  )
  .join('\n')

async function fixture(t: TestContext): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), 'athena-schema-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  await Promise.all(files.map(file => writeFile(join(directory, file), 'id,description\n1,example\n')))
  return directory
}

test('generated synthetic CSVs match the Athena schema contract', async () => {
  const response = await fetch(terraformUrl, { signal: AbortSignal.timeout(30_000) })
  if (!response.ok) {
    throw new Error(`Cannot fetch Athena Terraform: HTTP ${response.status}`)
  }
  await validateAthenaSchema(await response.text(), 'output')
})

test('accepts all four files with matching ordered headers and row widths', async t => {
  await validateAthenaSchema(terraform, await fixture(t))
})

for (const [name, content] of [
  ['reordered columns', 'description,id\nexample,1\n'],
  ['missing columns', 'id\n1\n'],
  ['extra columns', 'id,description,extra\n1,example,value\n'],
  ['renamed columns', 'id,name\n1,example\n'],
  ['duplicate columns', 'id,id\n1,example\n'],
  ['short rows', 'id,description\n1\n'],
  ['long rows', 'id,description\n1,example,extra\n'],
  ['header-only files', 'id,description\n'],
  ['empty files', ''],
  ['malformed CSV', 'id,description\n1,"unterminated\n'],
]) {
  test(`rejects ${name}`, async t => {
    const directory = await fixture(t)
    await writeFile(join(directory, files[0]), content)
    await assert.rejects(validateAthenaSchema(terraform, directory))
  })
}

test('rejects invalid HCL', async t => {
  await assert.rejects(validateAthenaSchema('invalid {', await fixture(t)), /Cannot parse Athena Terraform/)
})

test('rejects missing tables', async t => {
  await assert.rejects(
    validateAthenaSchema(terraform.replace('name = "position"', 'name = "renamed"'), await fixture(t)),
    /expected exactly one Terraform table named position/,
  )
})

test('rejects missing files, including the final table', async t => {
  const directory = await fixture(t)
  await rm(join(directory, files[3]))
  await assert.rejects(validateAthenaSchema(terraform, directory), /ENOENT/)
})

test('uses Terraform column order as the contract', async t => {
  await assert.rejects(
    validateAthenaSchema(terraform.replace('name = "description"', 'name = "new_column"'), await fixture(t)),
    /Expected: id,new_column/,
  )
})
