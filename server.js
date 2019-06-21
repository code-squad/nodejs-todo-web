const http = require('http');
const fs = require('fs');

const parseCookies = (cookie = '') =>
    cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k, ...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data)=> {
        if (err) throw err;
        res.end(data);
    });

}).listen(8080, () => {
    console.log('8080포트에서 대기중');
});