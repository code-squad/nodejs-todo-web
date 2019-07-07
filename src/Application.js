const http = require('http');

class Application {
    constructor() {
        this.server = http.createServer((req, res) => {
            res.end('hello world in Application')
        })
    }

    listen(port = 3000, hostname = '127.0.0.1', fn) {
        this.server.listen(port, hostname, fn);
    }
}

module.exports = Application;