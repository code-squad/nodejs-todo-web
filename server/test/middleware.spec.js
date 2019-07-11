const should = require('chai').should();
const sinon = require('sinon');
const Middleware = require('../middleware');

describe('middleware : 요구사항 1번', () => {
  const middleware = new Middleware();
  it('fns의 길이는 0이다.', () => {
    middleware.fns.length.should.equals(0);
  });
  it('middeleware.add()를 통해 함수를 배열에 넣는다.', () => {
    const stub = {
      mw1() {},
      mw2() {}
    };
    sinon.stub(stub, 'mw1').callsFake((req, res, next) => next());
    sinon.stub(stub, 'mw2').callsFake((req, res, next) => next());
    const fns = [
      stub.mw1,
      stub.mw2
    ]
    fns.forEach(fn => middleware.add(fn));
    middleware.fns.length.should.equals(2);
  });
});

describe('middleware : 요구사항 2번', () => {
  const middleware = new Middleware();
  it('미들웨어 함수를 실행한다', () => {
    const stub = {
      mw1() {},
      mw2() {}
    };
    sinon.stub(stub, 'mw1').callsFake((req, res, next) => next());
    sinon.stub(stub, 'mw2').callsFake((req, res, next) => next());

    const fns = [
      stub.mw1,
      stub.mw2,
    ]
    fns.forEach(fn => middleware.add(fn));

    middleware.runthis();

    fns.forEach(fn => {
      fn.called.should.be.equal(true)
    });
  });
});