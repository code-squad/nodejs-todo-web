const User = require('../user');
const should = require('chai').should();

const user = new User();

describe('POST /user', () => {
  it('일치하지 않는 비밀번호', async () => {
    const query = { username : 'nailer', password : '12345', passwordConfirm : '54321' };
    const response = await user.exec["POST"](query);
    response.should.deep.equals({ statusCode: 203, message: '비밀번호가 일치하지 않습니다.'});
  });
  it('이미 존재하는 유저', async () => {
    const query = { username : 'nailer', password : '12345', passwordConfirm : '12345' };
    const response = await user.exec["POST"](query);
    response.should.deep.equals({ statusCode: 203, message: '이미 존재하는 유저입니다.'});
  });
});

describe('GET /user', async () => {
  it('유저 조회하기', async () => {
    const username = 'nana';
    const response = await user.exec["GET"](username);
    response.should.deep.equals({ statusCode: 202, message: '유저가 존재합니다.', username: 'nana' });
  });
  it('없는 유저입니다.', async () => {
    const username = 'stephens';
    const response = await user.exec["GET"](username);
    response.should.deep.equals({ statusCode: 203, message: '존재하지 않는 유저입니다.' });
  });
});

describe('DELETE /user:id', async () => {
  const mockSessions = [{ sid : '125236281432', name : 'nana' }, 
                      { sid: '5123412352134', name : 'nailer'},
                      { sid : '125236281432', name : 'kaka' },];
  const newUser = { username : 'kaka', password : '12345', passwordConfirm: '12345' };
  await user.exec["POST"](newUser);
  it('유저 삭제하기', async () => {
    const query = { sid : '125236281432', name : 'kaka' };
    const response = await user.exec["DELETE"](query, mockSessions);
    response.should.deep.equals({ statusCode: 202, message: '유저를 삭제했습니다.'});
  });
});

