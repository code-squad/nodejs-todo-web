const App = require('src/Application');

const url = require('url');
const qs = require('querystring');
const path = require('path');
const app = App();
const serveStatic = require('./middlewares/serve-static');
const logger = require('./middlewares/logger');
const index = require('./routers/index');
const errors = require('./middlewares/errors');


app.use(logger);
app.use(serveStatic);
app.use(index.todoList);
app.use(errors.error404);
app.use(errors.error);

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


    }  else {
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
});

module.exports = app;
