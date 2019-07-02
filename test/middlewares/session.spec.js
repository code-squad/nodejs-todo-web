const session = require('../../middlewares/session');
const sessionMemory = require('../../db/sessionMemory');
const should = require('should');
const httpMocks = require('node-mocks-http');

describe('session Test', () => {

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

    it('cookit값이 undefied일 경우 session에 "false"를 반환', () => {
        session()(request, response, next);
        should(request.session).equal('false');
    })
    
    it('세션 메모리에 세션 아이디가 존재할 경우 리퀘스트 객체에 session 생성', () => {
        request.headers.cookie = `sessionID=mockID`;
        sessionMemory['mockID'] = {};

        session()(request, response, next);
        should(typeof request.session).equal('object');
    })
})