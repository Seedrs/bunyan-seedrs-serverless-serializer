import { isObject } from 'lib/util';

const event = (event) => {
  if (!isObject(event)) {
    return event;
  } else {
    if (event.Records && Array.isArray(event.Records)) {
      const files = event.Records.map(record => (
        {
          requestId:  record.responseElements && record.responseElements['x-amz-request-id'],
          eventTime: record.eventTime,
          eventName: record.eventName,
          key: record.s3 && record.s3.object && record.s3.object.key,
          size: record.s3 && record.s3.object && record.s3.object.size,
          bucket: record.s3 && record.s3.bucket && record.s3.bucket.name
        }
      ));

      return { files };
    } else {
      return event;
    }
  }
};

export default event;
