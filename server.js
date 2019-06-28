const http = require('http');
const {parseCookie} = require('./util');
const port = 8080;
const session = {};


const server = http.createServer((request, response) => {
    const cookie = parseCookie(request.headers.cookie);
    if(!(cookie.session in session)) {
        if(request.url === '/') {
            response.end(cookie.session);
        }
    }
});

server.listen(port, () => {
    console.log(`server is running at ${port}`);
});