const uuidv4 = require('uuid/v4');

class Session {
  constructor() {
    this.exec = { "GET" : this.get, "POST": this.post, "UPDATE": this.update, "DELETE": this.del };
    this.list = [];
  }
  get() {
    
  }
  post(username) {
    this.list.push({ username : username, id: uuidv4() });
    return;
  }
  update() {

  }
  del(){

  }
}

module.exports = Session;