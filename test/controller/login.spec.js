const should = require('should');
const httpMocks = require('node-mocks-http');
const loginController = require('../../controller/login');

describe('loginController Test', () => {

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
    it('getPage()를 요청하면 status 200과 content-type으로 text/html을 내려준다', async () => {
      const next = () => {};
      await loginController.getPage()(request, response, next);
      const contentType = await response.getHeader('Content-Type');
      const statusCode = await response.statusCode;

      should(contentType).equal('text/html');
      should(statusCode).equal(200);
    })
  })

})