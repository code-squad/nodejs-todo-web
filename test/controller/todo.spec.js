const todoController = require('../../controller/todo');
const should = require('should');
const httpMocks = require('node-mocks-http');
const cryptoUtil = require('../../utils/crypto-util');

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
      const id = await cryptoUtil.getCryptoHash('uniqueID');
      request.session = {'userID' : id};
      await todoController.getPage()(request, response, next);

      const statusCode = await response.statusCode;
      const contentType = await response.getHeader('Content-Type');

      should(contentType).equal('text/html');
      should(statusCode).equal(200);

    })
  })

  describe('addTodo()', () => {
    it('요청 객체로 데이터 추가를 요청했을 때, text/plain 형태의 숫자로 string 반환', async () => {
      request.body = {'data' : 'mockData', 'type' : "todo"};
      request.session = {'userID' : 'uniqueID'};

      await todoController.addTodo()(request, response, next);

      const statusCode = await response.statusCode;
      const contentType = await response.getHeader('Content-Type');
      const ajaxAnswer = await response._getData();

      should(contentType).equal('text/plain');
      should(statusCode).equal(200);
      should(typeof (ajaxAnswer*1)).equal('number');
    })
  })

})