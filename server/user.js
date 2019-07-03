const bcrypt = require('bcrypt');
const fs = require('fs');
const saltRounds = 4;

class User {
  constructor() {
    this.exec = { "POST" : this.post, "GET" : this.get, "DELETE" : this.delete };
  }

  async post(query) {
    const rawData = fs.readFileSync(`./data/user.json`)
    const users = await JSON.parse(rawData);
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
    return { statusCode: 202, message: '회원 가입 완료!' };
  }

  get() {
  
  }
  delete() {

  }
  

}

module.exports = User;