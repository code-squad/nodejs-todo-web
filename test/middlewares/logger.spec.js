const logger = require('../../middlewares/logger');
const httpMocks = require('node-mocks-http');
const sinon = require('sinon');

describe('logger Test', () => {
  let response;
  let request;
  let next;

  beforeEach(() => {
    response = httpMocks.createResponse();
    request = httpMocks.createRequest();
    next = () => {};
  })

  afterEach(() => {
    request = null;
    response = null;
  })

  it('메서드 별로 설정된 색깔 문자열 출력', () => {
    request.method = 'GET';
    request.url = 'path'
    sinon.spy(console, 'log');
    logger()(request, response, next);
    sinon.assert.calledWith(console.log, `\x1b[33m[${request.method}]\x1b[0m ${request.url}`)
  })

})