const http = require('http');

class Application {
  constructor() {
    this.server = http.createServer((req, res) => {

    });
  }
  listen(PORT = 3000, HOSTNAME = '127.0.0.1', fn) {
    this.server.listen(PORT, HOSTNAMAE, fn);
  }
}

module.exports = Application;