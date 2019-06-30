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
      const next = () => {};
      await registerController.getPage()(request, response, next);
      const contentType = await response.getHeader('Content-Type');
      const statusCode = await response.statusCode;

      should(contentType).equal('text/html');
      should(statusCode).equal(200);
    })
  })

  describe('checkDupleID()', () => {
    it('동일한 아이디가 있을 경우, 응답으로 deny를 반환한다', async() => {
      const next = () => {};
      request.url = '/register/korea'

      await registerController.checkDupleId()(request, response, next);

      const contentType = await response.getHeader('Content-Type');
      const statusCode = await response.statusCode;
      const answer = await response._getData();
      
      should(contentType).equal('text/plain');
      should(statusCode).equal(200);
      should(answer).equal('deny');
    })

    it('동일한 아이디가 아닐 경우, 응답으로 success 반환', async() => {
      const next = () => {};
      request.url = '/register/uniqueID'

      await registerController.checkDupleId()(request, response, next);

      const contentType = await response.getHeader('Content-Type');
      const statusCode = await response.statusCode;
      const answer = await response._getData();
      
      should(contentType).equal('text/plain');
      should(statusCode).equal(200);
      should(answer).equal('success');
    })
  })


})