const uuidv4 = require('uuid/v4');

class Session {
  constructor() {
    this.exec = { "GET" : this.get, "POST": this.post, "UPDATE": this.update, "DELETE": this.del };
    this.list = [];
  }
  get() {
    
  }
  create(username) {
    const newSession = { username : username, id: uuidv4() }
    this.list.push(newSession);
    return newSession;
  }
  update() {

  }
  del(){

  }
}

module.exports = Session;