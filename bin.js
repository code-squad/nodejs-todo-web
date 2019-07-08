const app = require('./src/Application');
const serveStatic = require('./middlewares/serve-static');
const path = require('path');
const fs = require('fs');
const logger = require('./middlewares/logger');
const port = 3000;
const hostName = '127.0.0.1';

const web = (req, res, next) => {
    const filePath = path.join(__dirname, './public/web.html');

    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    })
}

app.use(logger());
app.use(serveStatic());
app.use(web);

app.listen(port, hostName, () => {
    console.log(`${port}번 포트에서 서버 대기중입니다.`)
})
