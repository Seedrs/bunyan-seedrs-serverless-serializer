import serializer from 'lib/serializers/dynamodb/streamEvent';

describe('dynamodb stream event serializer', () => {
  describe('when event is not an object', () => {
    it('returns the value it was passed', () => {
      const expected = 'Hello';
      const event = 'Hello';

      expect(serializer(event)).toEqual(expected);
    });

    it('returns the correct object', () => {
      const expected = {
        records: [{
          eventId: '51609bad-7070-4dd9-9f80-cd353bb12c0c',
          eventName: 'REMOVE',
          eventSource: 'aws:dynamodb',
          awsRegion: 'ddblocal',
          approximateCreationDateTime: '2018-08-31T13:23:00.000Z',
          keys: {
            parent_resource: {
              S: 'business::1::campaign::1'
            },
            file_type_tag_name: {
              S: 'document::legal_document::something.txt'
            }
          }
        }]
      };

      const event = {
        Records: [
          {
            eventID: '51609bad-7070-4dd9-9f80-cd353bb12c0c',
            eventName: 'REMOVE',
            eventVersion: '1.1',
            eventSource: 'aws:dynamodb',
            awsRegion: 'ddblocal',
            dynamodb: {
              ApproximateCreationDateTime: '2018-08-31T13:23:00.000Z',
              Keys: {
                parent_resource: {
                  S: 'business::1::campaign::1'
                },
                file_type_tag_name: {
                  S: 'document::legal_document::something.txt'
                }
              }
            }
          }
        ]
      };
      expect(serializer(event)).toEqual(expected);
    });
  });
});
