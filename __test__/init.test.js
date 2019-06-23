test('서버 프로세스 최초 실행 시 init 함수가 잘 되는지 테스트', (done) => {
  const result = require('../init');
  expect(result).toEqual('success');
  done();
});