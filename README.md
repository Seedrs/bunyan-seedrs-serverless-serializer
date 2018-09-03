# bunyan-seedrs-serverless-serializer

[![Build status](https://badge.buildkite.com/f030295b9a489fbaf03109a045601898d8f5e8e4a8dcd848d4.svg)](https://buildkite.com/seedrs/bunyan-serverless-serializers) [![npm version](https://badge.fury.io/js/%40seedrs%2Fbunyan-seedrs-serverless-serializer.svg)](https://badge.fury.io/js/%40seedrs%2Fbunyan-seedrs-serverless-serializer) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This is a collection of serializers for the bunyan logger.  It allows
the developer to have a consistent logging format across all serverless
projects.

## Serializers

- apiGatewayEvent
- apiGatewayResponse
- s3Event
- dynamodbStreamEvent

## Usage

1. Installation
```
# With npm
npm i --save @seedrs/bunyan-seedrs-serverless-serializer

# With yarn
yarn add @seedrs/bunyan-seedrs-serverless-serializer --save
```

2. Setup bunyan with the serializers.
```javascript
const bunyan = require('bunyan');
const {
  apiGatewayEvent,
  apiGatewayResponse,
  s3Event,
  dynamodbStreamEvent
} = require('bunyan-seedrs-serverless-serializer');

const logger = bunyan.createLogger({
  name: 'myapp',
  stream: process.stdout,
  level: 'info',
  serializers: {
    apiGatewayEvent,
    apiGatewayResponse,
    s3Event,
    dynamodbStreamEvent
  }
});
```

3. Code example for API gateway events and responses.
```javascript
const handler = (event, context, callback) => {
  logger.info({ apiGatewayEvent: event });

  /* This will log the following fields from event to the log
  {
    "name":"myapp",
    "hostname":"host",
    "pid":53293,
    "level":30,
    "apiGatewayEvent": {
      "queryStringParameters":{
        "order_by[created_at]":"desc"
      },"
      "body":null,
      "method":"GET",
      "user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
      "host":"localhost:3000",
      "request_id":"offlineContext_requestId_",
      "stage":"dev",
      "path": "/test/path"
    },
    "msg":"",
    "time":"2017-12-11T14:23:24.416Z",
    "v":0
  }
  */

  const response = {
    statusCode: 200,
    body: {
      message: 'Go Serverless Webpack (Ecma Script) v1.0! Second module!',
    }
  };

  // To log responses in the aws lambda proxy format
  logger.info({ apiGatewayResponse: response });
  /*
  {
    "name":"myapp",
    "hostname":"host",
    "pid":53293,
    "level":30,
    "apiGatewayResponse": {
      "body":{
        "headers": {
          "Access-Control-Allow-Origin": "*",
        },
        "message":"Go Serverless Webpack (Ecma Script) v1.0! Second module!"
      },
      "statusCode":200,
      "request_id":"offlineContext_requestId_",
      "path": "/test/path"
    },
    "msg":"",
    "time":"2017-12-11T14:23:24.416Z",
    "v":0
  }
  */
};
```

4. Code example for S3 events.

```javascript
const handler = (event, context, callback) => {
  logger.info({ s3Event: event });

  /*
  {
    "name": "myapp",
    "hostname": "host",
    "pid":53293,
    "level":30,
    "s3Event": {
      "files": [
        {
          "requestId": "Amazon s3 generated request ID",
          "eventTime": "1970-01-01T00:00.000Z",
          "eventName": "event-type",
          "key": "object-key",
          "size": 1024,
          "bucket": "bucket-name"
        }
      ],
    }
  }
  */
};
```

5. Code example for dynamo db stream events.

```javascript
const handler = (event, context callback) => {
  logger.info({ dynamodbStreamEvent: event });

  /*
  {
    "name": "myapp",
    "hostname": "host",
    "pid":53293,
    "level": 30,
    "dynamodbStreamEvent": {
      "eventId": '51609bad-7070-4dd9-9f80-cd353bb12c0c',
      "eventName": 'REMOVE',
      "eventSource": 'aws:dynamodb',
      "awsRegion": 'ddblocal',
      "approximateCreationDateTime": '2018-08-31T13:23:00.000Z',
      "keys": {
        "parent_resource": {
          "S": 'business::1::campaign::1'
        },
        "file_type_tag_name": {
          "S": 'document::legal_document::something.txt'
        }
      }
    }
  */
};
```

## Tests and linting

1. Running tests is done with the following command

```
// Single test run
npm run test

// Watch
npm run test:watch
```

2. Linting is done with the following command

```
yarn lint
```

## Contributing

This project uses semantic release. When making a commit use this
command:

```
yarn commit
```

Follow the onscreen instructions to choose the correct description for
your change.

Open a PR with a description of the feature/change you wish to make.
