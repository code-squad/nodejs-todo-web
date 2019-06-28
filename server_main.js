const http = require('http');
const fs = require('fs');
const cookie = require('cookie');
const UserManager = require('./user_manager.js');
const Session = require('./session.js');
const userManager = new UserManager(fs);
const session = new Session();
const app = http.createServer(async (request, response) => {
    let url = request.url;
    console.log(`${request.method}, url = ${url}`);
    if (request.method === 'GET') {
        if (request.url === "/login" || request.url === '/' || request.url === "/login.html") {
            if (request.headers.cookie) {
                const cookies = cookie.parse(request.headers.cookie);
                if (session.isValidSessionID(cookies.sessionID)) {
                    response.writeHead(302, {
                        'Location': './index',
                        'Content-Type': 'text/html',
                        'Set-Cookie': [`sessionID = ${cookies.sessionID}; Max-Age = ${60 * 60 / 2}`]
                    });
                    return response.end('redirection');
                }
            }
            url = '/login.html';
            response.writeHead(200);
            return response.end(await userManager.myReadFile(__dirname + url));
        }
        if (request.url === "/index" || request.url === "/index.html") {
            if (request.headers.cookie) {
                const cookies = cookie.parse(request.headers.cookie);
                if (session.isValidSessionID(cookies.sessionID)) {
                    response.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Set-Cookie': [`sessionID = ${
                            cookies.sessionID}; Max-Age = ${60 * 60 / 2}`]
                    });
                    url = '/index.html';
                    return response.end(await userManager.myReadFile(__dirname + url));
                }
            }
            response.writeHead(302, {
                'Location': './login',
                'Content-Type': 'text/html',
                'Set-Cookie': [`sessionID = ''; Max-Age = 0`]
            });
            return response.end('redirection');
        }
        return fs.readFile(`.${request.url}`, (err, data) => {
            if (err) {
                response.writeHead(404, 'NOT FOUND');
                return response.end('NOT FOUND');
            }
            return response.end(data);
        });


    } else if (request.method === 'POST') {
        if (request.url === "/login" || request.url === '/') {
            let body = '';
            request.on('data', (data) => {
                body += data;
            });
            if (request.headers.cookie) {
                const cookies = cookie.parse(request.headers.cookie);
            }
            return request.on('end', async () => {
                const id = JSON.parse(body).id;
                const pw = Number(JSON.parse(body).pw);
                const userInfo = await userManager.logIn(id, pw);
                if (!userInfo) {
                    response.writeHead(409, 'CONFLICT');
                    return response.end('CONFLICT');
                } else {
                    const sessionID = session.getSessionID(userInfo);
                    response.writeHead(302, {
                        'Content-Type': 'text/html',
                        'Location': './index',
                        'Set-Cookie': [`sessionID = ${sessionID}; Max-Age = ${60 * 60 / 2}`]
                    });
                    console.log(`user "${id}" has logged in. sessionID = "${sessionID}"`);
                    return response.end('set cookie');
                }
            });
        }
    }

    response.writeHead(404, 'NOT FOUND');
    return response.end('NOT FOUND');

});
app.listen(3000);