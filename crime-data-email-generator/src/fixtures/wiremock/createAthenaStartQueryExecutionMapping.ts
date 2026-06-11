const createAthenaStartQueryExecutionMapping = (
  queryExecutionId: string,
  queryPattern: string,
  queryParams: Array<string>,
  priority: number = 1,
) => {
  return {
    name: 'Athena StartQueryExecution',
    metadata: {
      description: 'Stub an athena start query execution request',
    },
    priority,
    request: {
      method: 'POST',
      url: '/',
      headers: {
        'X-Amz-Target': {
          equalTo: 'AmazonAthena.StartQueryExecution',
        },
      },
      bodyPatterns: [
        {
          matchesJsonPath: {
            expression: '$.QueryString',
            contains: queryPattern,
          },
        },
        ...queryParams.map(param => ({
          matchesJsonPath: `$.ExecutionParameters[?(@ == "${param}")]`,
        })),
      ],
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      jsonBody: {
        QueryExecutionId: queryExecutionId,
      },
    },
  }
}

export default createAthenaStartQueryExecutionMapping
