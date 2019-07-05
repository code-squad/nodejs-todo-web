const should = require('should');
const httpMocks = require('node-mocks-http');
const serveStatic = require('../../middlewares/serve-static');

describe('serveStatic middleware Test', () => {
  
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

  it('유효한 자원일 경우 200 응답, 해당 파일의 mimeType으로 content-type 설정', async () => {
    request.url = '/index.html';
    await serveStatic()(request, response, next);

    const contentType = await response.getHeader('Content-Type');
    const statusCode = await response.statusCode;

    should(contentType).equal('text/html');
    should(statusCode).equal(200);
  })

  it('유효한 자원이 아닐 경우 404 응답으로 Not Found File이라는 문자열 반환', async () => {
    request.url = '/unkonown.html';
    await serveStatic()(request, response, next);

    const statusCode = await response.statusCode;
    should(contentType).equal('text/plain');
    should(statusCode).equal(404);
  })
})