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