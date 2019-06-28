const http = require('http');
const model = require('./model');
const {parseCookie} = require('./util');
const port = 8080;
const session = {};


const server = http.createServer(async (request, response) => {
    const cookie = parseCookie(request.headers.cookie);
    if(!(cookie.session in session)) {
        if(request.url === '/') {
            const loginHTML = await model.readStaticFile('./login.html');
            response.statusCode = 200;
            response.end(loginHTML);
        }
        if(request.url === '/login.js') {
            const loginJS = await model.readStaticFile('./login.js');
            response.statusCode = 200;
            response.end(loginJS);
        }

    }
    
    if(request.url === '/signup.html') {
        const signupHTML = await model.readStaticFile('./signup.html');
        response.statusCode = 200;
        response.end(signupHTML);
    }
});

server.listen(port, () => {
    console.log(`server is running at ${port}`);
});