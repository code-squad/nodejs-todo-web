const http = require('http');
const model = require('./model');
const signupController = require('./signup-controller');
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

    if(request.url === '/signup.js') {
        const signupJS = await model.readStaticFile('./signup.js');
        response.statusCode = 200;
        response.end(signupJS);
    }

    if(request.url === '/signup' && request.method === 'POST') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            const {id, password} = JSON.parse(body);
            if(signupController.signup(id, password)) {
                response.statusCode = 200;
                response.end();
            } else {
                response.statusCode = 400;
                response.end();
            }
        });
    }
});

server.listen(port, () => {
    console.log(`server is running at ${port}`);
});