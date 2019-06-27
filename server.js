const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const fileType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt'
    };
    const ext = path.parse(req.url).ext; // 확장자 정보
    const publicPath = path.join(__dirname, '/public'); // public 경로

    if(Object.keys(fileType).includes(ext)) {
        fs.readFile(`${publicPath}${req.url}`, (err, data) => {
            if(err) {
                res.statusCode = 404;
                res.end('Not found');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', fileType[ext]);
                res.end(data);
            }
        });
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        const filePath = path.join(__dirname, 'public/index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }
})

server.listen(8080, () => {
    console.log('8080포트에서 대기중');
});