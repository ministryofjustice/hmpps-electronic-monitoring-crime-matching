const createStsAssumeRoleMapping = () => {
  return {
    name: 'STS AssumeRole',
    metadata: {
      description: 'Stub an STS assume role request',
    },
    request: {
      method: 'POST',
      url: '/',
      formParameters: {
        Action: {
          equalTo: 'AssumeRole',
        },
        RoleSessionName: {
          equalTo: 'CrimeMatchingApiSession',
        },
        Version: {
          equalTo: '2011-06-15',
        },
        RoleArn: {
          equalTo: 'arn:aws:iam::800964199911:role/ac_read_emds_data_dev',
        },
      },
    },
    response: {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
      body: `
<AssumeRoleResponse xmlns="https://sts.amazonaws.com/doc/2011-06-15/">
  <AssumeRoleResult>
    <SourceIdentity>mock</SourceIdentity>
    <AssumedRoleUser>
      <Arn>arn:aws:sts::123456789012:assumed-role/mock/mock</Arn>
      <AssumedRoleId>ARO123EXAMPLE123:mock</AssumedRoleId>
    </AssumedRoleUser>
    <Credentials>
      <AccessKeyId>ASIAIOSFODNN7EXAMPLE</AccessKeyId>
      <SecretAccessKey>wJalrXUtnFEMI/K7MDENG/bPxRfiCYzEXAMPLEKEY</SecretAccessKey>
      <SessionToken>
        AQoDYXdzEPT//////////wEXAMPLEtc764bNrC9SAPBSM22wDOk4x4HIZ8j4FZTwdQW
        LWsKWHGBuFqwAeMicRXmxfpSPfIeoIYRqTflfKD8YUuwthAx7mSEI/qkPpKPi/kMcGd
        QrmGdeehM4IC1NtBmUpp2wUE8phUZampKsburEDy0KPkyQDYwT7WZ0wq5VSXDvp75YU
        9HFvlRd8Tx6q6fE8YQcHNVXAkiY9q6d+xo0rKwT38xVqr7ZD0u0iPPkUL64lIZbqBAz
        +scqKmlzm8FDrypNC9Yjc8fPOLn9FX9KSYvKTr4rvx3iSIlTJabIQwj2ICCR/oLxBA==
      </SessionToken>
      <Expiration>2019-11-09T13:34:41Z</Expiration>
    </Credentials>
    <PackedPolicySize>6</PackedPolicySize>
  </AssumeRoleResult>
  <ResponseMetadata>
    <RequestId>c6104cbe-af31-11e0-8154-cbc7ccf896c7</RequestId>
  </ResponseMetadata>
</AssumeRoleResponse>
            `,
    },
  }
}

export default createStsAssumeRoleMapping
