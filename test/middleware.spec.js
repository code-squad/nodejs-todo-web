const should = require('should');
const sinon = require('sinon');
const Middleware = require('../src/middleware');

describe('Middleware Module', () => {
  let middleware;
  beforeEach(() => {
    middleware = new Middleware();
  })

  it('생성한 미들웨어는 length 0인 미들웨어 배열을 가진다', () => {
    should(middleware.middlewareArr.length).be.equal(0);
  })


})