# Bunyan seedrs serverless serializer

## Description

This is a collection of serializers for the bunyan logger.  It allows
the developer to have a consistent logging format across all serverless
projects. It currently only contains serializers for API gateway lambda
proxy event objects and responses.

## Usage

1. Installation
```
# With npm
npm i --save @seedrs/bunyan-seedrs-serverless-serializer

# With yarn
yarn add @seedrs/bunyan-seedrs-serverless-serializer --save
```

2. Code example
```javascript
const bunyan = require('bunyan');
const {
  apiGatewayEvent,
  apiGatewayResponse
} = require('bunyan-seedrs-serverless-serializer');

const logger = bunyan.createLogger({
  name: 'myapp',
  stream: process.stdout,
  level: 'info',
  serializers: {
    event: apiGatewayEvent,
    response: apiGatewayResponse
  }
});

const handler = (event, context, callback) => {
  logger.info({ event })

  /* This will log the following fields from event to the log
  {
    "name":"myapp",
    "hostname":"host",
    "pid":53293,
    "level":30,
    "event": {
      "queryStringParameters":{
        "order_by[created_at]":"desc"
      },"
      "body":null,
      "method":"GET",
      "user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36",
      "host":"localhost:3000",
      "request_id":"offlineContext_requestId_",
      "stage":"dev"
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
  logger.info({ response });
  /*
  {
    "name":"myapp",
    "hostname":"host",
    "pid":53293,
    "level":30,
    "response": {
      "body":{
        "headers": {
          "Access-Control-Allow-Origin": "*",
        },
        "message":"Go Serverless Webpack (Ecma Script) v1.0! Second module!"
      },
      "statusCode":200
    },
    "msg":"",
    "time":"2017-12-11T14:23:24.416Z",
    "v":0
  }
  */
```

## Tests

1. Running tests in done with the following command
```
// Single test run
npm run test

// Watch
npm run test:watch
```

## Contributing

1. Open a PR with a description of the issue or feature you want to
   solve/add. Lets discuss it in the PR.

