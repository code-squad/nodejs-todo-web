const http = require('http');
const debug = require('../utils/debug')('Application');
const Middleware = require('../src/middleware');

const Application = class {
  constructor() {
    this.middleware = new Middleware();
    this.server =  http.createServer((req, res) => {
      this.middleware.run(req, res);
    });
  }

  listen(port=3000, host='localhost', fn) {
    this.server.listen(port, host, fn);
    debug('server is listening');
  }

  use(...param) {
    let [path, func] = param;

    if(param.length === 1 && typeof path === 'function') {
      func = path;
    } else if (param.length === 2 && typeof path === 'string' && typeof func === 'function') {
      func.path = path;
    } else {
      console.error('올바르지 않은 use 함수입니다')
      return;
    }

    this.middleware.add(func);
  }

  get(path, func) {
    if (!path || !func) throw Error('path and fn is required');
    func.method = 'get';
    this.use(path, func);
  }

  post(path, func) {
    if (!path || !func) throw Error('path and fn is required');
    func.method = 'post';
    this.use(path, func);
  }

  patch(path, func) {
    if (!path || !func) throw Error('path and fn is required');
    func.method = 'patch';
    this.use(path, func);
  }

  delete(path, func) {
    if (!path || !func) throw Error('path and fn is required');
    func.method = 'delete';
    this.use(path, func);
  }
}

module.exports = Application;