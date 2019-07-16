const should = require('chai').should();
const Session = require('../session');

describe('POST session', () => {
  it('username를 받아서 세션을 생성한다.', () => {
    const session = new Session();
    const username = 'nailer';
    session.post(username);
    const postedSes = session.list.find(ses => ses.username === username);
    postedSes.username.should.equals(username);
  });
});