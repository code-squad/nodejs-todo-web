const server = require('./server');

const Application = class {
  constructor(server) {
    this.server = server;
  }

  listen(port=3000, host='localhost', fn) {
    this.server.listen(port, host, fn)
  }
}

module.exports = Application;