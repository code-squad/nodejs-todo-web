const http = require('http');
const path = require('path');
const model = require('./model');
const signupController = require('./signup-controller');
const loginController = require('./login-controller');
const addController = require('./add-controller');
const updateController = require('./update-controller');
const deleteController = require('./delete-controller');
const { parseCookie, generateRandomInt } = require('./util');
const mimeType = require('./mime-type');
const port = 8080;
const session = {};

const server = http.createServer(async (request, response) => {
    const method = request.method;
    const ext = path.parse(request.url).ext;
    if (Object.keys(mimeType).includes(ext)) {
        const file = await model.readStaticFile(`.${request.url}`);
        response.writeHead(200, {'Content-Type': `${mimeType[ext]}`});
        response.end(file);
    }

    if(request.headers.cookie) {
        const cookie = parseCookie(request.headers.cookie);
        if (cookie.session in session) {
            const sid = cookie.session;
            const user = session[sid];
            if (method === 'GET') {
                if (request.url === '/') {
                    const mainHTML = await model.readStaticFile('./main.html');
                    response.statusCode = 200;
                    response.end(mainHTML);
                }
                if (request.url === '/items') {
                    const items = JSON.parse(await model.readStaticFile('./items.json'))[user];
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(items));
                }
            } else if (method === 'POST') {
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
                            response.statusCode = 400;
                            response.end();
                        }
                    });
                }
            } else if (method === 'PATCH') {
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
                            response.statusCode = 400;
                            response.end();
                        }
                    });
                }
            } else if (method === 'DELETE') {
                if (request.url === '/auth') {
                    delete session[sid];
                    response.writeHead(200, {'Set-Cookie': [`session = ''; Max-Age = 0`]});
                    response.end();
                }

                if (request.url === '/items') {       
                    let body = [];
                    request.on('data', (chunk) => {
                        body.push(chunk);
                    }).on('end', async () => {
                        const id = Buffer.concat(body).toString();
                        if(deleteController.delete(user, id)) {
                            response.statusCode = 200;
                            response.end();
                        }
                        response.statusCode = 400;
                        response.end();
                    });
                }
            }
        }
    }
    if (method === 'GET') {
        if (request.url === '/') {
            const loginHTML = await model.readStaticFile('./login.html');
            response.statusCode = 200;
            response.end(loginHTML);
        }

    } else if (method === 'POST') {
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
        }

        if (request.url === '/members') {
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
    }
});

server.listen(port, () => {
    console.log(`server is running at ${port}`);
});