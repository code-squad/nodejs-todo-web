const todoController = require('../../controller/todo');
const should = require('should');
const httpMocks = require('node-mocks-http');

describe('todoController Test', () => {
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

  describe('getPage()', () => {
    it('session이 존재하지 않거나 session value가 false일 경우 status는 302, location "/" 상태가 된다', async () => {
      request.session = null;
      await todoController.getPage()(request, response, next);
      let statusCode = await response.statusCode;
      let redirectUrl = await response._getHeaders().location;

      should(statusCode).equal(302);
      should(redirectUrl).equal('/');

      request.session = 'false';

      statusCode = await response.statusCode;
      redirectUrl = await response._getHeaders().location;

      should(statusCode).equal(302);
      should(redirectUrl).equal('/');
    })

    it('session애 userID 프로퍼티가 존재할 경우, status200, content-Type text/html로 응답', async () => {
      request.session = {'userID' : 'uniqueID'};
      await todoController.getPage()(request, response, next);

      const statusCode = await response.statusCode;
      const contentType = await response.getHeader('Content-Type');

      should(contentType).equal('text/html');
      should(statusCode).equal(200);

    })
  })
})