import validateAthenaSchema from './athena-schema'

const tables = ['position', 'device_activations', 'caseload', 'orders_activations_positions'] as const
type TableName = (typeof tables)[number]
const csv = 'id,description\n1,example\n'
const csvContents: Record<TableName, string> = {
  position: csv,
  device_activations: csv,
  caseload: csv,
  orders_activations_positions: csv,
}
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

test('accepts all four CSVs with matching ordered headers and row widths', () => {
  validateAthenaSchema(terraform, csvContents)
})

test.each([
  { name: 'reordered columns', content: 'description,id\nexample,1\n' },
  { name: 'missing columns', content: 'id\n1\n' },
  { name: 'extra columns', content: 'id,description,extra\n1,example,value\n' },
  { name: 'renamed columns', content: 'id,name\n1,example\n' },
  { name: 'duplicate columns', content: 'id,id\n1,example\n' },
  { name: 'short rows', content: 'id,description\n1\n' },
  { name: 'long rows', content: 'id,description\n1,example,extra\n' },
  { name: 'header-only files', content: 'id,description\n' },
  { name: 'empty files', content: '' },
  { name: 'malformed CSV', content: 'id,description\n1,"unterminated\n' },
])('rejects $name', ({ content }) => {
  expect(() => validateAthenaSchema(terraform, { ...csvContents, position: content })).toThrow()
})

test('rejects missing CSV content', () => {
  const { position: _position, ...missingPosition } = csvContents
  expect(() => validateAthenaSchema(terraform, missingPosition)).toThrow('position/position.csv: missing CSV content')
})

test('rejects missing tables', () => {
  expect(() => validateAthenaSchema(terraform.replace('name = "position"', 'name = "renamed"'), csvContents)).toThrow(
    'expected exactly one Terraform table named position',
  )
})

test('uses Terraform column order as the contract', () => {
  expect(() =>
    validateAthenaSchema(terraform.replace('name = "description"', 'name = "new_column"'), csvContents),
  ).toThrow(/Expected: id,new_column/)
})
