import { isObject, isEventWithRecords } from 'lib/util';

export default (event) => {
  if (isObject(event)) {
    if (isEventWithRecords(event)) {
      const records = event.Records.map(record => (
        {
          eventId: record.eventID,
          eventName: record.eventName,
          eventSource: record.eventSource,
          awsRegion: record.awsRegion,
          approximateCreationDateTime: record.dynamodb &&
            record.dynamodb.ApproximateCreationDateTime,
          keys: record.dynamodb.Keys
        }
      ));

      return { records };
    }
  } else {
    return event;
  }
};
