const createAthenaGetQueryExecutionMapping = (queryExecutionId: string) => {
  return {
    name: 'Athena GetQueryExecution',
    metadata: {
      description: 'Stub an athena get query execution request',
    },
    request: {
      method: 'POST',
      url: '/',
      headers: {
        'X-Amz-Target': {
          equalTo: 'AmazonAthena.GetQueryExecution',
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
        'Content-Type': 'application/json',
      },
      jsonBody: {
        QueryExecution: {
          QueryExecutionId: queryExecutionId,
          Query: '',
          StatementType: '',
          ResultConfiguration: {
            OutputLocation: `s3://athena-results/${queryExecutionId}.csv`,
          },
          QueryExecutionContext: {
            Database: '',
            Catalog: '',
          },
          Status: {
            State: 'SUCCEEDED',
            SubmissionDateTime: 0,
            CompletionDateTime: 0,
          },
          Statistics: {
            EngineExecutionTimeInMillis: 0,
            DataScannedInBytes: 0,
            TotalExecutionTimeInMillis: 0,
            QueryQueueTimeInMillis: 0,
            QueryPlanningTimeInMillis: 0,
          },
          WorkGroup: 'AthenaAdmin',
        },
      },
    },
  }
}

export default createAthenaGetQueryExecutionMapping
