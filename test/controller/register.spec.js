const should = require('should');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');

const registerController = require('../../controller/register');

describe('register Controller Test', () => {
  let response;
  let request;

  beforeEach(() => {
    response = httpMocks.createResponse();
    request = httpMocks.createRequest();
  })

  afterEach(() => {
    request = null;
    response = null;
  })

  describe('getPage()', () => {
    it('getPage()를 요청하면 status 200과 content-type으로 text/html을 내려준다', async () => {
      const next = 0;
      await registerController.getPage()(request, response, next);
      const contentType = await response.getHeader('Content-Type');
      const statusCode = await response.statusCode;

      should(contentType).equal('text/html');
      should(statusCode).equal(200);
    })
  })
})