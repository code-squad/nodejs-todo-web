const App = require('src/Application');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const app = App();

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};

http.createServer((req, res) => {
    const loginFilePath = path.join(__dirname, './public/login.html');
    const indexFilePath = path.join(__dirname, './public/index.html');
    const ext = path.parse(req.url).ext;
    const publicPath = path.join(__dirname, './public');
    const cookies = parseCookies(req.headers.cookie);

    console.log(req.url);
    if (req.url.startsWith('/?')) {
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getSeconds() + 10);
        const randomInt = +new Date();
        session[randomInt] = {
            name,
            expires,
        };
        res.writeHead(302, {
            Location    : '/',
            'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    // } else if (cookies.session && session[cookies.session].expires > new Date()) {
    //     res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //     // res.end(`${session[cookies.session].name}님 안녕하세요`);
    //     res.end(indexFilePath)


    } else if (Object.keys(mimeType).includes(ext)) {
        fs.readFile(`${publicPath}${req.url}`, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
                throw err;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', mimeType[ext]);
            res.end(data);
        });
    } else {
        fs.readFile(loginFilePath, (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('Not Found');
                throw err;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });
    }
})
    .listen(8085, () => {
        console.log('8085번 포트에서 서버 대기중입니다!');
    });

module.exports = app;
