const debug = require('../utils/debug')('App');

const Application = class {
  constructor(server) {
    this.server = server;
  }

  listen(port=3000, host='localhost', fn) {
    this.server.listen(port, host, fn);
    debug('server is listening');
  }
}

module.exports = Application;