const should = require('should');
const sinon = require('sinon');
const App = require('../../src/application');

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

  describe('use() method', () => {
    it('middleware 모듈의 add() 메서드 실행', () => {
      const spy = sinon.spy();
      const app = new App();

      app.middleware.add = spy;
      const func = () => {};
      
      app.use(func);

      should(spy.called).be.equal(true);
    })

    it('파라미터가 하나이고, 함수일 경우에만 미들웨어에 등록', () => {
      const spy = sinon.spy();
      const app = new App();

      app.middleware.add = spy;

      app.use('this is not func');
      should(spy.called).be.equal(false);
      
      const func = sinon.stub(() => {});
      app.use(func);
      should(spy.called).be.equal(true);
    })

    it('파라미터가 두 개이고, (string, function) 일 경우 미들웨어에 등록', () => {
      const spy = sinon.spy();
      const app = new App();

      app.middleware.add = spy;
      const func = sinon.stub(() => {});

      app.use(func, func);
      should(spy.called).be.equal(false);

      app.use('this is url path', func);
      should(spy.called).be.equal(true);
    })

  })

  describe('get() method', () => {
    it('파라미터가 두 개이고, (string, function) 일 경우 미들웨어에 등록', () => {
      const spy = sinon.spy();
      const app = new App();

      app.middleware.add = spy;
      const func = sinon.stub(() => {});

      app.get('path', func);
      should(spy.called).be.equal(true);
    })

    it('미들웨어에 등록된 후, func method로 문자열 get 반환', () => {
      const app = new App();
      const func = sinon.stub(() => {});
      
      app.get('path', func);
      should(func.method).be.equal('get');
    })
    
  })

  describe('post() method', () => {
    it('파라미터가 두 개이고, (string, function) 일 경우 미들웨어에 등록', () => {
      const spy = sinon.spy();
      const app = new App();

      app.middleware.add = spy;
      const func = sinon.stub(() => {});

      app.post('path', func);
      should(spy.called).be.equal(true);
    })

    it('미들웨어에 등록된 후, func method로 post 반환', () => {
      const app = new App();
      const func = sinon.stub(() => {});
      
      app.post('path', func);
      should(func.method).be.equal('post');
    })
  })

  describe('patch() method', () => {
    it('파라미터가 두 개이고, (string, function) 일 경우 미들웨어에 등록', () => {
      const spy = sinon.spy();
      const app = new App();

      app.middleware.add = spy;
      const func = sinon.stub(() => {});

      app.patch('path', func);
      should(spy.called).be.equal(true);
    })

    it('미들웨어에 등록된 후, func method로 patch 반환', () => {
      const app = new App();
      const func = sinon.stub(() => {});
      
      app.patch('path', func);
      should(func.method).be.equal('patch');
    })


  })

  describe('delete() method', () => {
    it('파라미터가 두 개이고, (string, function) 일 경우 미들웨어에 등록', () => {
      const spy = sinon.spy();
      const app = new App();

      app.middleware.add = spy;
      const func = sinon.stub(() => {});

      app.delete('path', func);
      should(spy.called).be.equal(true);
    })

    it('미들웨어에 등록된 후, func method로 delete 반환', () => {
      const app = new App();
      const func = sinon.stub(() => {});
      
      app.delete('path', func);
      should(func.method).be.equal('delete');
    })
  })


})