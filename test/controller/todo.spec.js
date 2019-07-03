const todoController = require('../../controller/todo');
const should = require('should');
const httpMocks = require('node-mocks-http');
const cryptoUtil = require('../../utils/crypto-util');
const csvParser = require('../../utils/csv-parser');

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

  describe('추가, 업데이트, 삭제 시나리오', () => {
    let ajaxAnswer;
    it('요청 객체로 데이터 추가를 요청했을 때, text/plain 형태의 숫자로 string 반환', async () => {
      
      // 데이터 추가
      request.body = {'data' : 'mockData', 'type' : "todo"};
      request.session = {'userID' : 'uniqueID'};

      await todoController.addTodo()(request, response, next);

      let statusCode = await response.statusCode;
      let contentType = await response.getHeader('Content-Type');
      ajaxAnswer = await response._getData();

      should(contentType).equal('text/plain');
      should(statusCode).equal(200);
      should(typeof (ajaxAnswer*1)).equal('number');
    })

    it('데이터 삭제 요청 시 해당 아이템 삭제', async () => {
      request.url = `/todos/${ajaxAnswer}`;
      await todoController.deleteTodo()(request, response, next);

      statusCode = await response.statusCode;
      contentType = await response.getHeader('Content-Type');
      
      should(contentType).equal('text/plain');
      should(statusCode).equal(200);
      
      const allDataObj = await csvParser.getKeyValueObj('./db/todoList.csv');
      const card = allDataObj[ajaxAnswer];
      should(card).equal(undefined);
      
      ajaxAnswer = await response._getData();
      should(ajaxAnswer).equal('success');
    })
    
    it('카드 순서 업데이트 시 db반영 후 sucesss string 반환', async () => {
      request.session = {'userID' : 'uniqueID'};
      request.body = { 'todo' : '1#', 'doing' : '2#', 'done' : '3#' };
      
      await todoController.updateCardSequence()(request, response, next);
      const answer = await response._getData();
      const contentType = await response.getHeader('Content-Type');
      const statusCode = await response.statusCode;
      
      should(answer).equal('success');
      should(contentType).equal('text/plain');
      should(statusCode).equal(200);

    })

  })
})