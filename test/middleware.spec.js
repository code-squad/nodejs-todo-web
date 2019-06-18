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
  })




})