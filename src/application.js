const http = require('http');
const debug = require('../utils/debug')('Application');
const Middleware = require('../src/middleware');

const Application = class {
  constructor() {
    this.middleware = new Middleware(this.req, this.res);
    this.req;
    this.res;
  
    this.server =  http.createServer((req, res) => {
      this.req = req;
      this.res = res;
    });
  }

  listen(port=3000, host='localhost', fn) {
    this.server.listen(port, host, fn);
    debug('server is listening');
  }

  use(func) {
    this.middleware.add(func);
  }
}

module.exports = Application;