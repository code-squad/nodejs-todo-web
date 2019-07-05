const should = require('should');
const sinon = require('sinon');
const Middleware = require('../../src/middleware');

describe('Middleware Module', () => {
  let middleware;
  beforeEach(() => {
    middleware = new Middleware();
  })

  it('생성한 미들웨어는 length 0인 미들웨어 배열을 가진다', () => {
    should(middleware.middlewareArr.length).be.equal(0);
  })

  describe('add()', () => {
    it('미들웨어 배열에 함수를 추가', () => {
      const functionArr = [
        () => {}, () => {}, () => {}
      ]

      functionArr.forEach((func) => {
        middleware.add(func);
      })

      should(middleware.middlewareArr.length).be.equal(3);
    })
  })

  describe('run()', () => {
    it('미들웨어 배열의 함수 실행', () => {
      // 가짜 함수인 익명 함수 스텁을 만든다
      const stub1 = sinon.stub();
      const stub2 = sinon.stub();
      const stub3 = sinon.stub();

      // 만든 스텁 함수의 동작을 callsFake로 정의한다
      stub1.callsFake((req, res, next) => next());
      stub2.callsFake((req, res, next) => next());
      stub3.callsFake((req, res, next) => next());

      const funcs = [stub1, stub2, stub3];

      // 미들웨어 배열에 스텁 함수를 등록
      funcs.forEach((func) => {
        middleware.middlewareArr.push(func);
      });

      // run 메서드 실행
      middleware.run();

      funcs.forEach((func) => {
        // 메서드가 모두 호춣되었는 지 test
        should(func.called).equal(true);
      })
    })

    it('next()가 없을 경우 미들웨어를 중단하고 빠져나온다', () => {
      const func1 = sinon.stub();
      const stop = sinon.stub();
      const func2 = sinon.stub();

      func1.callsFake((req, res, next) => next());
      stop.callsFake(() => null);
      func2.callsFake((req, res, next) => next());

      const funcs = [func1, stop, func2];

      funcs.forEach((func) => {
        middleware.middlewareArr.push(func);
      })

      middleware.run();

      should(func2.called).equal(false);
    })

    it('에러가 발생할 경우 즉시 중지 후 핸들러 메서드로 넘어감', () => {
      const stub = {
        func1(req, res, next) {},
        errorFunc(req, res, next) {},
        func2(req, res, next) {},
        errorHandler(err, req, res, next) {}
      }

      sinon.stub(stub, 'func1').callsFake((req, res, next) => next());
      sinon.stub(stub, 'errorFunc').callsFake((req, res, next) => next(Error()));
      sinon.stub(stub, 'func2').callsFake((req, res, next) => next());
      sinon.stub(stub, 'errorHandler').callsFake((err, req, res, next) => null);

      const funcs = [stub.func1, stub.errorFunc, stub.func2, stub.errorHandler];

      funcs.forEach((func) => {
        middleware.add(func);
      })

      middleware.run();

      funcs.forEach((func, index) => {
        console.log(index, func.called)
        const shouldInvoked = index !== 2;
        should(func.called).be.equal(shouldInvoked);
      })
    })
  })

  describe('isOverLength(index)', () => {
    it('미들웨어 배열이 index보다 작거나 같으면 true를 반환한다', () => {
      const index = 3;

      const func1 = sinon.stub();
      const func2 = sinon.stub();
      const func3 = sinon.stub();
      const func4 = sinon.stub();

      // index : 3, arrLength : 2
      middleware.middlewareArr.push(func1);
      middleware.middlewareArr.push(func2);
      should(middleware.isOverLength(index)).be.equal(true);

      // index : 3, arrLength : 3
      middleware.middlewareArr.push(func3);
      should(middleware.isOverLength(index)).be.equal(true);

      // index : 3, arrLength : 4
      middleware.middlewareArr.push(func4);
      should(middleware.isOverLength(index)).be.equal(false);

    })
  })

  describe('executeMiddleware(index, err)', () => {
    it('err가 있을 경우, handleErrorMiddleware를 실행한다', () => {
      const stub = {
        func1(req, res, next) {},
        errorFunc(req, res, next) {},
        func2(req, res, next) {},
        errorHandler(err, req, res, next) {}
      }

      sinon.stub(stub, 'func1').callsFake((req, res, next) => next());
      sinon.stub(stub, 'errorFunc').callsFake((req, res, next) => next(Error()));
      sinon.stub(stub, 'func2').callsFake((req, res, next) => next());
      sinon.stub(stub, 'errorHandler').callsFake((err, req, res, next) => null);

      

    })
  })


})