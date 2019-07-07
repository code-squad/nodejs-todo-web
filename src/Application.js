const http = require('http');
const path = require('path');
const fs = require('fs');

class Application {
    constructor() {
        this.server = http.createServer((req, res) => {
            const filePath = path.join(__dirname, '../public/web.html');
            fs.readFile(filePath, (err, data) => {
                if (err) throw err;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            })
            // res.end('hello world in Application')
        })
    }

    listen(port = 3000, hostname = '127.0.0.1', fn) {
        this.server.listen(port, hostname, fn);
    }
}

module.exports = Application;