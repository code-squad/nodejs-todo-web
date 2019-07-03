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

  describe('loginRequest()', () => {
    it('올바르지 않은 유저 정보를 가질 경우 302 "/"로 리다이렉트', async () => {
      request.body = {'id' : 'invlaidID', 'password' : 'thisispass'};
      await loginController.loginRequest()(request, response, next);

      const statusCode = await response.statusCode;
      const redirectUrl = await response._getHeaders().location;

      should(statusCode).equal(302);
      should(redirectUrl).equal('/');
    })

    it('올바른 유저 정보일 경우 todos로 리다이렉트', async () => {
      request.body = {'id' : 'korea', 'password' : '1234'};
      await loginController.loginRequest()(request, response, next);

      const statusCode = await response.statusCode;
      const redirectUrl = await response._getHeaders().location;

      should(statusCode).equal(302);
      should(redirectUrl).equal('/todos');
    })

  })

})