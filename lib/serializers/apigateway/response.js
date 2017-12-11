const isObject = require('../../util').isObject;

module.exports = (res) => {
  if (!isObject(res)) {
    return res;
  } else {
    const {
      statusCode,
      headers,
      body
    } = res;

    return {
      body,
      headers,
      statusCode
    };
  }
}
