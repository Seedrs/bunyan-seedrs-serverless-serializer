import { isObject } from 'lib/util';

const response = (res) => {
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
};

export default response;
