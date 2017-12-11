const isObject = require('../../util').isObject;

module.exports = (event) => {
  if (!isObject(event)) {
    return event;
  } else {
    const {
      headers,
      queryStringParameters,
      body,
      httpMethod,
      requestContext
    } = event;

    return {
      queryStringParameters,
      body,
      method: httpMethod,
      user_agent: headers && headers['User-Agent'],
      host: headers && headers.Host,
      request_id: requestContext && requestContext.requestId,
      stage: requestContext && requestContext.stage
    };
  }
};

