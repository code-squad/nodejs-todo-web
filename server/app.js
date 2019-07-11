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
    this.server.listen(PORT, HOSTNAME, fn);
  }
  use(path, fn) {
    if (typeof path === 'string' && typeof fn === 'function') {
      fn.path = path;
    } else if (typeof path === 'function') {
      fn = path;
    } else {
      throw Error('use(path, fn) or use(fn)');
    }
    
    this.middleware.add(fn);
  }
}

module.exports = Application;