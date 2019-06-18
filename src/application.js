const http = require('http');
const debug = require('../utils/debug')('Application');

const Application = class {
  constructor() {
    this.server =  http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('hello, node');
    });
  }

  listen(port=3000, host='localhost', fn) {
    this.server.listen(port, host, fn);
    debug('server is listening');
  }
}

module.exports = Application;