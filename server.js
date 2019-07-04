const http = require('http');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
const model = require('./model');
const signupController = require('./signup-controller');
const loginController = require('./login-controller');
const addController = require('./add-controller');
const updateController = require('./update-controller');
const deleteController = require('./delete-controller');
const { parseCookie, generateRandomInt } = require('./util');
const mimeType = require('./mime-type');
const port = process.env.PORT || 8080;
const session = {};

const server = http.createServer(async (request, response) => {
    const method = request.method;
    const pathObj = path.parse(request.url) 
    const ext = pathObj.ext;
    const filePath = __dirname + '/' + pathObj.base;

    if (Object.keys(mimeType).includes(ext)) {
        const file = await model.readStaticFile(`${filePath}`);
        response.writeHead(200, {'Content-Type': `${mimeType[ext]}`});
        response.end(file);
    }

    if(request.headers.cookie) {
        const cookie = parseCookie(request.headers.cookie);
        if (cookie.session in session) {
            const sid = cookie.session;
            const user = session[sid];
            switch(method) {
                case 'GET':
                    if (request.url === '/') {
                        const mainHTML = await model.readStaticFile('./main.html');
                        response.statusCode = 200;
                        response.end(mainHTML);
                    } else if (request.url === '/items') {
                        const items = JSON.parse(await model.readStaticFile('./items.json'))[user];
                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.end(JSON.stringify(items));
                    }
                    break;
                case 'POST':
                    if (request.url === '/items') {       
                        let body = [];
                        request.on('data', (chunk) => {
                            body.push(chunk);
                        }).on('end', async () => {
                            body = Buffer.concat(body).toString();
                            const item = JSON.parse(body);
                            const id = await addController.add(user, item);
                            if(id) {
                                response.statusCode = 200;
                                response.end(`${id}`);
                            } else {
                                response.statusCode = 503;
                                response.end();
                            }
                        });
                    }
                    break;
                case 'PATCH':
                    if (request.url === '/items') {       
                        let body = [];
                        request.on('data', (chunk) => {
                            body.push(chunk);
                        }).on('end', async () => {
                            body = Buffer.concat(body).toString();
                            const { targetID, siblingID, status } = JSON.parse(body);
                            if (await updateController.update({ user, targetID, siblingID, status })) {
                                response.statusCode = 200;
                                response.end();
                            } else {
                                response.statusCode = 503;
                                response.end();
                            }
                        });
                    }
                    break;
                case 'DELETE':
                    if (request.url === '/auth') {
                        delete session[sid];
                        response.writeHead(200, {'Set-Cookie': [`session = ''; Max-Age = 0`]});
                        response.end();
                    } else if (request.url.startsWith('/items')) {
                        const query = querystring.parse(url.parse(request.url).query);
                        const id = query.id;
                        if(deleteController.delete(user, id)) {
                            response.statusCode = 200;
                            response.end();
                        }
                        response.statusCode = 503;
                        response.end();
                    }
                    break;
            }
        }
    }

    switch (method) {
        case 'GET':
            if (request.url === '/') {
                const loginHTML = await model.readStaticFile('./login.html');
                response.statusCode = 200;
                response.end(loginHTML);
            }
            break;
        case 'POST':
            if (request.url === '/auth') {
                let body = [];
                request.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', async () => {
                    body = Buffer.concat(body).toString();
                    const {id, password} = JSON.parse(body);
                    if (await loginController.login(id, password)) {
                        const sid = generateRandomInt();
                        session[sid] = id;
                        response.writeHead(200, {'Set-Cookie': `session =${sid}; HttpOnly`});
                        response.end("success");
                    } else {
                        response.statusCode = 200;
                        response.end("fail");
                    }
                });
            } else if (request.url === '/members') {
                let body = [];
                request.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', async () => {
                    body = Buffer.concat(body).toString();
                    const { id, password } = JSON.parse(body);
                    if (await signupController.signup(id, password)) {
                        response.statusCode = 200;
                        response.end("success");
                    } else {
                        response.statusCode = 200;
                        response.end("fail");
                    }
                });
            }
            break;
    }
});

server.listen(port, () => {
    console.log(`server is running at ${port}`);
});