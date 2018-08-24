import serializer from 'lib/serializers/s3/event';

const testS3Event = {
  Records:[
    {
      eventVersion: '2.0',
      eventSource: 'aws:s3',
      awsRegion: 'us-east-1',
      eventTime: '1970-01-01T00:00:00.000Z',
      eventName: 'event-type',
      userIdentity:{
        principalId: 'Amazon-customer-ID-of-the-user-who-caused-the-event'
      },
      requestParameters:{
        sourceIPAddress: 'ip-address-where-request-came-from'
      },
      responseElements:{
        'x-amz-request-id': 'Amazon S3 generated request ID',
        'x-amz-id-2':'Amazon S3 host that processed the request'
      },
      s3:{
        s3SchemaVersion:'1.0',
        configurationId:'ID found in the bucket notification configuration',
        bucket:{
          name: 'bucket-name',
          ownerIdentity:{
            principalId: 'Amazon-customer-ID-of-the-bucket-owner'
          },
          arn: 'bucket-ARN'
        },
        object:{
          key: 'object-key',
          size: 1024,
          eTag: 'eTag',
          versionId: 'object version if bucket is versioning-enabled, otherwise null',
          sequencer: '1223'
        }
      }
    }
  ]
};

describe('s3 event serializer', () => {
  describe('when event is not an object', () => {
    it('returns the value it was passed', () => {
      const expected = 'Hello';
      const event = 'Hello';

      expect(serializer(event)).toEqual(expected);
    });
  });

  it('returns the correct object', () => {
    const expected = {
      files: [{
        requestId: 'Amazon S3 generated request ID',
        eventTime: '1970-01-01T00:00:00.000Z',
        eventName: 'event-type',
        key: 'object-key',
        size: 1024,
        bucket: 'bucket-name'
      }]
    };

    expect(serializer(testS3Event)).toEqual(expected);
  });
});
