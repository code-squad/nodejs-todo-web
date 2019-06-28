const http = require('http');
const {parseCookie} = require('./util');
const port = 8080;

const server = http.createServer((request, response) => {
    if(request.url === '/') console.log(parseCookie(request.headers.cookie));
});

server.listen(port, () => {
    console.log(`server is running at ${port}`);
});