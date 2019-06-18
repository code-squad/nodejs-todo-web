const should = require('should');
const sinon = require('sinon');
const App = require('../src/application');

describe('application module', () => {
  describe('listen() method', () => {
    it('server 객체의 listen 함수 실행', () => {
      // 환경 세팅하고
      const app = new App();
      const spy = sinon.spy();
      app.server.listen = spy;
      
      // 테스트할 환경을 실행하고
      app.listen();

      // 테스트를 검증한다
      should(spy.called).equal(true);
    })
  })
})