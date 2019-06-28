const http = require('http');
const port = 8080;
const server = http.createServer((request, response) => {
    if(request.url === '/') response.end('Hello World');
});

server.listen(port, () => {
    console.log(`server is running at ${port}`);
});