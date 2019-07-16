const bcrypt = require('bcrypt');
const fs = require('fs');
const saltRounds = 4;
const rawData = fs.readFileSync(`./data/user.json`);
const users = JSON.parse(rawData);


class User {
  constructor() {
    this.exec = {
      "POST" : this.post, 
      "GET" : this.get, 
      "DELETE" : this.delete, 
      "UPDATE" : this.update,
      "/logIn" : this.logIn,
    };
  }

  async post(query) {
    const { username, password, passwordConfirm } = query;
    if ( password !== passwordConfirm) {
      return { statusCode: 203, message: '비밀번호가 일치하지 않습니다.' };
    }
    
    if (users.some(tmpuser => tmpuser.name === username)) {
      return { statusCode: 203, message: '이미 존재하는 유저입니다.' };
    }
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    users.push({ name : username, password : encryptedPassword });
    fs.writeFileSync(`./data/user.json`, JSON.stringify(users));
    return { statusCode: 302, message: '회원 가입 완료!', location : '/?success=' + encodeURIComponent('성공적으로 회원가입되었습니다!') };
  }

  async get(query) {
    const { username } = query;
    if (users.some(tmpuser => tmpuser.name === username)) {
      return { statusCode: 202, message: '유저가 존재합니다.', username: username };
    }
    return { statusCode: 203, message: '존재하지 않는 유저입니다.' };
  }

  async delete(query, sessions) {
    const { sid, name } = query;
    const delIdx = sessions.findIndex(el => el.sid === sid && el.name === name);
    if (delIdx === -1) {
      return { statusCode: 203, message: '잘못된 접근입니다.' };
    }
    await users.splice(delIdx, 1);
    fs.writeFileSync(`./data/user.json`, JSON.stringify(users));
    return { statusCode: 202, message: '유저를 삭제했습니다.'};
  }

  async logIn(req, res, next) {
    const { username, password } = req.body;
    console.log(req.body);
    let user = users.filter(tmpuser => tmpuser.name === username)[0];
    const passwordMatched = await bcrypt.compare(password, user.password)
    if (!user || !passwordMatched) {
      console.log('login Failed');
      console.log(user.password);
    } else {
      console.log('login success');
      console.log(user.password);
    }
    next();
  }
}

module.exports = User;
