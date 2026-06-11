type ColumnType = 'bigint' | 'date' | 'double' | 'timestamp' | 'varchar'
type Column = {
  name: string
  type: ColumnType
}

const columnPrecisions: Record<ColumnType, number> = {
  bigint: 19,
  date: 0,
  double: 19,
  timestamp: 3,
  varchar: 2147483647,
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-athena/Interface/ColumnInfo/
const createColumnInfo = (column: Column) => {
  return {
    CaseSensitive: false,
    CatalogName: 'hive',
    Label: column.name,
    Name: column.name,
    Nullable: 'UNKNOWN',
    Precision: columnPrecisions[column.type],
    Scale: 0,
    SchemaName: '',
    TableName: '',
    Type: column.type,
  }
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-athena/Interface/Datum/
const createDatum = (value: string) => {
  return {
    VarCharValue: value,
  }
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-athena/Interface/Row/
const createRow = (values: Array<string>) => {
  return {
    Data: values.map(createDatum),
  }
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-athena/Interface/ResultSetMetadata/
const createResultSetMetadata = (columns: Array<Column>) => {
  return {
    ColumnInfo: columns.map(createColumnInfo),
  }
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-athena/Interface/ResultSet/
const createResultSet = (columns: Array<Column>, data: Array<Array<string>>) => {
  return {
    ResultSetMetadata: createResultSetMetadata(columns),
    Rows: [createRow(columns.map(column => column.name)), ...data.map(createRow)],
  }
}

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-athena/Interface/GetQueryResultsCommandOutput/
const createGetQueryResultsResponse = (columns: Array<Column>, data: Array<Array<string>>) => {
  return {
    ResultSet: createResultSet(columns, data),
    UpdateCount: 0,
  }
}

const createAthenaGetQueryResultsMapping = (
  queryExecutionId: string,
  columns: Array<Column>,
  data: Array<Array<string>>,
) => {
  return {
    name: 'Athena GetQueryResults',
    metadata: {
      description: 'Stub an athena get query results request',
    },
    request: {
      method: 'POST',
      url: '/',
      headers: {
        'X-Amz-Target': {
          equalTo: 'AmazonAthena.GetQueryResults',
        },
      },
      bodyPatterns: [
        {
          matchesJsonPath: {
            expression: 'QueryExecutionId',
            matches: queryExecutionId,
          },
        },
      ],
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/z-amz-json-1.1',
      },
      jsonBody: createGetQueryResultsResponse(columns, data),
    },
  }
}

export default createAthenaGetQueryResultsMapping
