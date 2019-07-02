const http = require('http');
const path = require('path');
const fs = require('fs');
const Model = require('./model');

const model = new Model();
const sessions = [];

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

    if(Object.keys(fileType).includes(ext)) { // 정적파일 처리
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

        const filePath = path.join(__dirname, 'public/login.html');
        fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            res.end(data);
        });
    }
    // 로그인 회원가입 일 때 - 쿠키가 없음..
    if (req.method == 'GET') {

    } else if (req.method == 'POST') {

    } else if (req.method == 'PUT') {

    } else if (req.method == 'DELETE') {

    }

    // 로그인 후 todo 페이지 - 쿠키가 발급됨..
    
});

server.listen(8081, () => {
    console.log('8081포트에서 대기중');
});

        // if (req.url === '/cards') {
        //     req.on('data', (data) => {
        //         console.log(typeof data, data.toString());
        //         //model.loadData();
        //         model.appendCard(data);
                
        //     });
        // }