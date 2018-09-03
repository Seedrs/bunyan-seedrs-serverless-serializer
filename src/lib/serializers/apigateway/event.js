import { isObject } from 'lib/util';

const event = (event) => {
  if (!isObject(event)) {
    return event;
  } else {
    const {
      headers,
      queryStringParameters,
      body,
      path,
      httpMethod,
      requestContext
    } = event;

    return {
      queryStringParameters,
      body,
      path,
      method: httpMethod,
      user_agent: headers && headers['User-Agent'],
      host: headers && headers.Host,
      request_id: requestContext && requestContext.requestId,
      stage: requestContext && requestContext.stage
    };
  }
};

export default event;
