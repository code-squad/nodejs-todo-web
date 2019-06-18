const should = require('should');
const sinon = require('sinon');
const debug = require('../utils/debug');

describe('debug module', () => {
  describe('생성', () => {
    it('태그명을 인자로 받는다 (없으면 예외를 던진다)', () => {
      should(() => debug()).throw();
    })

    it('함수를 반환한다', () => {
      const debug = debug('tag');
      should(typeof debug).be.equal('function');
    })

  })
})