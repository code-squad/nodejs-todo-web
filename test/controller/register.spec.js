const should = require('should');
const httpMocks = require('node-mocks-http');
const registerController = require('../../controller/register');
const cryptoUtil = require('../../utils/crypto-util');

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
    it('동일한 아이디가 아닐 경우, 응답으로 success 반환', async() => {
      const next = () => {};
      const id = await cryptoUtil.getCryptoHash('uniqueID');
      request.url = `/register/${id}`

      await registerController.checkDupleId()(request, response, next);

      const contentType = await response.getHeader('Content-Type');
      const statusCode = await response.statusCode;
      const answer = await response._getData();
      
      should(contentType).equal('text/plain');
      should(statusCode).equal(200);
      should(answer).equal('success');
    })
  })

  describe('submitRegisterInfo()', () => {
    it('중복 아이디가 아닐 경우 회원가입 db 쓰기 작업 이후 302 상태코드, /로 리다이렉트', async() => {
      const next = () => {};
      const id = await cryptoUtil.getCryptoHash('uniqueID');
      request.body = { 'id' : id, 'password' : 1234 };

      await registerController.submitRegisterInfo()(request, response, next);

      const statusCode = await response.statusCode;
      const redirectUrl = await response._getHeaders().location;

      should(statusCode).equal(302);
      should(redirectUrl).equal('/');
    })
  })
})