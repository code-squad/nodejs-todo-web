class Session {
  constructor() {
    this.exec = { "GET" : this.get, "POST": this.post, "UPDATE": this.update, "DELETE": this.del }
  }
  get() {
    
  }
  post() {

  }
  update() {

  }
  del(){

  }
}

module.exports = Session;