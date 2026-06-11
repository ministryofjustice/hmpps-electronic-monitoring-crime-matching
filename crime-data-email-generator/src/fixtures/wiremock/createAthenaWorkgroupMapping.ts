const createAthenaGetWorkGroupMapping = () => {
  return {
    name: 'Athena GetWorkGroup',
    metadata: {
      description: 'Stub Athena WorkGroup lookup',
    },
    request: {
      method: 'POST',
      url: '/',
      headers: {
        'X-AMZ-Target': {
          equalTo: 'AmazonAthena.GetWorkGroup',
        },
      },
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      jsonBody: {
        WorkGroup: {
          Name: 'primary',
          State: 'ENABLED',
          Configuration: {
            ResultConfiguration: {
              OutputLocation: 's3://athena-results/',
            },
            EnforceWorkGroupConfiguration: false,
            PublishCloudWatchMetricsEnabled: false,
            RequesterPaysEnabled: false,
          },
          Description: 'Stubbed Athena WorkGroup',
          CreationTime: '2024-01-01T00:00:00Z',
        },
      },
    },
  }
}

export default createAthenaGetWorkGroupMapping
