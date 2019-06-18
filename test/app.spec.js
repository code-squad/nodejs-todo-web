const should = require('should');
const App = require('../src/application');
const app = new App();

describe('server module', () => {

  it('should have listen()', () => {
    app.should.have.property('listen');
    (typeof app.listen).should.equal('function');
  });
})