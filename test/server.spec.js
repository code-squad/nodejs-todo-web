const should = require('should');
const server = require('../server');

describe('server test', () => {

  it('should have listen()', () => {
    server.should.have.property('listen');
    (typeof server.listen).should.equal('function');
  });
})