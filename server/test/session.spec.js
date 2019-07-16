const should = require('chai').should();
const Session = require('../session');

describe('POST /login', () => {
  it('username의 정보를 session list에 추가한다.', async () => {
    const session = new Session();
    await session.post('nailer');
    let postedSes = session.list.find(ses => ses.username === 'nailer');
    postedSes.username.should.equals('nailer');
    await session.post('seunghee');
    postedSes = session.list.find(ses => ses.username === 'seunghee');
    postedSes.username.should.equals('seunghee');
  });
  it('user의 sid를 생성하여 session에 추가한다.', async () => {
    const session = new Session();
    await session.post('nailer');
    const nailerSes = session.list.find(ses => ses.username === 'nailer');
    nailerSes.id.should.be.a('string');
    await session.post('seunghee');
    const heeSes = session.list.find(ses => ses.username === 'seunghee');
    heeSes.id.should.not.equals(nailerSes.id);
  });
});