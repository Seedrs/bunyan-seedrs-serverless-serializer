import serializer from 'lib/serializers/apigateway/response';

describe('api gateway response serializer', () => {

  describe('when the response is not an object', () => {
    it('returns the value it was passed', () => {
      const expected = 'Hello';
      const response = 'Hello';

      expect(serializer(response)).toEqual(expected);
    });
  });

  it('returns the correct object', () => {
    const expected = {
      body: {
        a: 'b',
        b: 'x'
      },
      headers: {
        'Access-Allow-Origin': '*.seedrs.com',
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      path: 'http://test/path',
      request_id: 'requestid'
    };
    const response = {
      statusCode: 200,
      path: 'http://test/path',
      request_id: 'requestid',
      headers: {
        'Access-Allow-Origin': '*.seedrs.com',
        'Content-Type': 'application/json'
      },
      body: {
        a: 'b',
        b: 'x'
      }
    };

    expect(serializer(response)).toEqual(expected);
  });
});
