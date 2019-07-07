const http = require('http');
const Middleware = require('./Middleware');

class Application {
    constructor(middleware) {
        this.middleware = middleware;
        this.server = http.createServer((req, res) => {
            this.middleware.run(req, res);
        })
    }

    use(fn) {
        this.middleware.add(fn);
    }

    listen(port = 3000, hostname = '127.0.0.1', fn) {
        this.server.listen(port, hostname, fn);
    }
}

const middleware = new Middleware();
module.exports = new Application(middleware);