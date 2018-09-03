import apiGatewayEvent from 'lib/serializers/apigateway/event';
import apiGatewayResponse from 'lib/serializers/apigateway/response';
import s3Event from 'lib/serializers/s3/event';
import dynamodbStreamEvent from 'lib/serializers/dynamodb/streamEvent';

export {
  apiGatewayEvent,
  apiGatewayResponse,
  s3Event,
  dynamodbStreamEvent
};
