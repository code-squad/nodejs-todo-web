const http = require('http');
const debug = require('../utils/debug')('Application');
const path = require('path');
const fs = require('fs');

const Application = class {
  constructor() {
    this.server =  http.createServer((req, res) => {
      
      const filePath = path.join(__dirname, '../public/index.html');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      
      fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        res.end(data);
      });
    });
  }

  listen(port=3000, host='localhost', fn) {
    this.server.listen(port, host, fn);
    debug('server is listening');
  }
}

module.exports = Application;