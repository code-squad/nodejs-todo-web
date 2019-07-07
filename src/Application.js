const http = require('http');
const path = require('path');
const fs = require('fs');
const Middleware = require('./Middleware');

class Application {
    constructor(middleware) {
        this.middleware = middleware;
        this.server = http.createServer((req, res) => {
            const mimeType = {
                '.ico': 'image/x-icon',
                '.html': 'text/html',
                '.js': 'text/javascript',
                '.css': 'text/css',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.eot': 'appliaction/vnd.ms-fontobject',
                '.ttf': 'aplication/font-sfnt'
            };
            const publicPath = path.join(__dirname, '../public')
            const ext = path.parse(req.url).ext;

            if (Object.keys(mimeType).includes(ext)) {
                fs.readFile(`${publicPath}${req.url}`, (err, data) => {
                    if (err) {
                        res.statusCode = 404;
                        res.end('Not found');
                    } else {
                        res.statusCode = 200
                        res.setHeader('Content-Type', mimeType[ext]);
                        res.end(data)
                    }
                });
            } else {
                const filePath = path.join(__dirname, '../public/web.html')
                fs.readFile(filePath, (err, data) => {
                    if (err) throw err;
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(data);
                })
            }
        })
    }

    listen(port = 3000, hostname = '127.0.0.1', fn) {
        this.server.listen(port, hostname, fn);
    }
}

const middleware = new Middleware();
module.exports = new Application(middleware);