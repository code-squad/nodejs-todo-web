const http = require('http');
const Middleware = require('./middleware');



class Application {
  constructor() {
    this.middleware = new Middleware();
    this.server = http.createServer((req, res) => {
      this.middleware.runthis(req, res);
    });
  }
  listen(PORT = 3000, HOSTNAME = '127.0.0.1', fn) {
    this.server.listen(PORT, HOSTNAMAE, fn);
  }
  use(fn) {
    this.middleware.add(fn);
  }
}

module.exports = Application;