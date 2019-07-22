const uuidv4 = require('uuid/v4');
const fs = require('fs');

const data = fs.readFileSync('./data/session.json');
const sessions = JSON.parse(data);

class Session {
  constructor() {
    this.exec = { "GET" : this.get, "POST": this.post, "UPDATE": this.update, "DELETE": this.delete };
  }
  get() {
    
  }
  create(username) {
    const newSession = { username : username, id: uuidv4() }
    sessions.push(newSession);
    fs.writeFileSync('./data/session.json', JSON.stringify(sessions));
    return newSession;
  }
  update() {
    
  }
  delete(sid, name){
    const sesIdx = sessions.findIndex(ses =>
      ses.username === name && ses.id === sid);
    sessions.splice(sesIdx, 1);
    fs.writeFileSync('./data/session.json', JSON.stringify(sessions));
    return;
  }
}

module.exports = Session;