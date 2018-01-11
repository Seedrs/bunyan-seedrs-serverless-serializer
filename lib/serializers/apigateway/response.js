const isObject = require('../../util').isObject;

module.exports = (res) => {
  if (!isObject(res)) {
    return res;
  } else {
    const {
      statusCode,
      headers,
      body,
      path,
      request_id
    } = res;

    return {
      body,
      headers,
      statusCode,
      path,
      request_id
    };
  }
}
