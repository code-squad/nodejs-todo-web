const http = require('http');
const model = require('./model');
const signupController = require('./signup-controller');
const loginController = require('./login-controller');
const { parseCookie, getRandomInt } = require('./util');
const port = 8080;
const session = {};


const server = http.createServer(async (request, response) => {
    const cookie = parseCookie(request.headers.cookie);
    if (cookie.session in session) {
        if (request.url === '/') {
            const mainHTML = await model.readStaticFile('./main.html');
            response.statusCode = 200;
            response.end(mainHTML);
        }
        if (request.url === '/main.css') {
            const mainCSS = await model.readStaticFile('./main.css');
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.end(mainCSS);
        }
        if (request.url === '/main.js') {
            const mainJS = await model.readStaticFile('./main.js');
            response.writeHead(200, {'Content-Type': 'text/javascript'});
            response.end(mainJS);
        }
        if (request.url === '/init') {
            const items = JSON.parse(await model.readStaticFile('./items.json'))
        }
    }

    if (request.url === '/') {
        const loginHTML = await model.readStaticFile('./login.html');
        response.statusCode = 200;
        response.end(loginHTML);
    }

    if (request.url === '/login.js') {
        const loginJS = await model.readStaticFile('./login.js');
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(loginJS);
    }

    if (request.url === '/login' && request.method === 'POST') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', async () => {
            body = Buffer.concat(body).toString();
            const {id, password} = JSON.parse(body);
            if (await loginController.login(id, password)) {
                const sid = getRandomInt();
                session[sid] = id;
                response.writeHead(200, {'Set-Cookie': `session =${sid}; HttpOnly`});
                response.end("success");
            } else {
                response.statusCode = 200;
                response.end("fail");
            }
        });
    }

    if (request.url === '/signup.html') {
        const signupHTML = await model.readStaticFile('./signup.html');
        response.statusCode = 200;
        response.end(signupHTML);
    }

    if (request.url === '/signup.js') {
        const signupJS = await model.readStaticFile('./signup.js');
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(signupJS);
    }

    if (request.url === '/signup' && request.method === 'POST') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', async () => {
            body = Buffer.concat(body).toString();
            const {
                id,
                password
            } = JSON.parse(body);
            if (await signupController.signup(id, password)) {
                response.statusCode = 200;
                response.end("success");
            } else {
                response.statusCode = 200;
                response.end("fail");
            }
        });
    }
});

server.listen(port, () => {
    console.log(`server is running at ${port}`);
});