const http = require('http');
const Middleware = require('./Middleware');

class Application {
    constructor(middleware) {
        this.middleware = middleware;
        this.server = http.createServer((req, res) => {
            this.middleware.run(req, res);
        })
    }

    use(path, fn) {
        if (typeof path === 'string' && typeof fn === 'function') {
            fn._path = path;
        } else if (typeof path == 'function') {
            fn = path;
        } else {
            throw Error('Usage: use(path, fn) or use(fn)');
        }

        this.middleware.add(fn);
    }

    get(path, fn) {
        if (!path || !fn) throw Error('path and fn is required');
        fn._method = 'get';
        this.use(path, fn);
    }

    post(path, fn) {
        if (!path || !fn) throw Error('path and fn is required');
        fn._method = 'post';
        this.use(path, fn);
    }

    listen(port = 3000, hostname = '127.0.0.1', fn) {
        this.server.listen(port, hostname, fn);
    }
}

const middleware = new Middleware();
module.exports = new Application(middleware);