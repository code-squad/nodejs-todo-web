const logoutController = require('../../controller/logout');
const should = require('should');
const httpMocks = require('node-mocks-http');
const cryptoUtil = require('../../utils/crypto-util');


describe('logoutController Test', () => {
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

  describe('logoutRequest()', () => {
    it('session ID와 Max-age를 초기화한 쿠키 스트링을 반환한다', async () => {
      const id = await cryptoUtil.getCryptoHash('uniqueID');
      request.session = {'userID' : id};

      await logoutController.logoutRequest()(request, response, next);
      const cookieArr = (response._getHeaders()['set-cookie']);

      const initCookirStr = `sessionID=''; Max-age=0`;
      should(cookieArr[0]).equal(initCookirStr);
    })

    it('로그아웃 실행 후 302 statuscode "/"로 리다이렉트한다', async () => {
      const id = await cryptoUtil.getCryptoHash('uniqueID');
      request.session = {'userID' : id};

      await logoutController.logoutRequest()(request, response, next);
      
      const statusCode = await response.statusCode;
      const redirectUrl = await response._getHeaders().location;

      should(statusCode).equal(302);
      should(redirectUrl).equal('/');
    })
  })
})