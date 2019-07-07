const http = require('http');
const port = 3000;
const hostName = '127.0.0.1';

const server = http.createServer((req, res) => {
    res.end('hello world');
});

server.listen(port, hostName, () => {
    console.log(`${port}번 포트에서 서버 대기중입니다.`)
})