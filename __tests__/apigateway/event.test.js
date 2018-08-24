import serializer from 'lib/serializers/apigateway/event';

describe('api gateway event serializer', () => {
  describe('when event is not an object', () => {
    it('returns the value it was passed', () => {
      const expected = 'Hello';
      const event = 'Hello';

      expect(serializer(event)).toEqual(expected);
    });
  });

  it('returns the correct object', () => {
    const expected = {
      host: '192.168.0.1',
      user_agent: 'User-agent',
      method: 'GET',
      request_id: 'requestid',
      stage: 'dev',
      queryStringParameters: {
        order_by: 'created_at'
      },
      path: 'http://test/path',
      body: null
    };
    const event = {
      headers: {
        Host: '192.168.0.1',
        'User-Agent': 'User-agent',
      },
      requestContext: {
        stage: 'dev',
        requestId: 'requestid',
      },
      httpMethod: 'GET',
      queryStringParameters: {
        order_by: 'created_at'
      },
      path: 'http://test/path',
      body: null
    };

    expect(serializer(event)).toEqual(expected);
  });
});
