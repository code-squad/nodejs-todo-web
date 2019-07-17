const bcrypt = require('bcrypt');
const fs = require('fs');
const saltRounds = 4;
const rawData = fs.readFileSync(`./data/user.json`);
const users = JSON.parse(rawData);
const Session = require('./session');
const sessions = new Session();

class User {
  constructor() {
    this.exec = {
      "POST /user" : this.post, 
      "POST /logIn" : this.logIn,
    };
  }

  async post(req, res, next) {
    const { username, password, passwordConfirm } = req.body;
    if ( password !== passwordConfirm) {
      return { statusCode: 203, message: '비밀번호가 일치하지 않습니다.' };
    }
    
    if (users.some(tmpuser => tmpuser.name === username)) {
      return { statusCode: 203, message: '이미 존재하는 유저입니다.' };
    }
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    users.push({ name : username, password : encryptedPassword });
    fs.writeFileSync(`./data/user.json`, JSON.stringify(users));

    res.statusCode = 302;
    res.setHeader('Location', '/?success=' + encodeURIComponent('성공적으로 회원가입되었습니다!'));
    res.end();
  }

  async logIn(req, res, next) {
    const { username, password } = req.body;
    console.log(req.body);
    let user = users.filter(tmpuser => tmpuser.name === username)[0];
    if (!user) {
      res.statusCode = 302;
      res.setHeader('Location', '/?fail=' + encodeURIComponent('로그인 실패!'));
      res.end();
      return;
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      console.log('login Failed', username);
      res.statusCode = 302;
      res.setHeader('Location', '/?fail=' + encodeURIComponent('로그인 실패!'));
      res.end();
      return;
    } else {
      console.log('login success');
      const createdSession = await sessions.create(username);
      res.statusCode = 302;
      res.setHeader('Location', 
        '/game?success=' + encodeURIComponent('상대를 찾는 중입니다!'));
      res.setHeader('Set-Cookie', [
        `name=${createdSession.username}`, 
        `sid=${createdSession.id}`
      ]);
      res.end();
      return;
    }
  }
}

module.exports = User;
