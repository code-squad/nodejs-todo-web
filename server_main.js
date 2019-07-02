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
                const sessionData = session.isValidSessionID(cookies.sessionID);
                if (sessionData) {
                    response.writeHead(302, {
                        'Location': './index',
                        'Content-Type': 'text/html',
                        'Set-Cookie': [`sessionID = ${sessionData.sessionID}; Path = /; Max-Age = ${60 * 60 / 2}`]
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
                const sessionData = session.isValidSessionID(cookies.sessionID);
                if (sessionData) {
                    response.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Set-Cookie': [`sessionID = ${sessionData.sessionID}; Max-Age = ${60 * 60 / 2}`]
                    });
                    url = '/index.html';
                    return response.end(await userManager.myReadFile(__dirname + url));
                }
                response.writeHead(302, {
                    'Location': './login',
                    'Content-Type': 'text/html',
                    'Set-Cookie': [`sessionID = ''; Path = / ; Max-Age = 0`]
                });
                return response.end('redirection');
            }
            response.writeHead(302, {
                'Location': './login',
            });
            return response.end('redirection');
        }
        if (request.url === "/index/userData") {
            const cookies = cookie.parse(request.headers.cookie);
            const sessionData = session.isValidSessionID(cookies.sessionID);
            if (sessionData) {
                const userData = await userManager.readUserData(sessionData.id,sessionData.pw);
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Set-Cookie': [`sessionID = ${sessionData.sessionID}; Path = /; Max-Age = ${60 * 60 / 2}`]
                });
                return response.end(JSON.stringify({'id':userData.id,data:userData.data}));
            }
            response.writeHead(302, {
                'Location': './login',
                'Content-Type': 'text/html',
                'Set-Cookie': [`sessionID = ''; Path = /; Max-Age = 0`]
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
            return request.on('end', async () => {
                const id = JSON.parse(body).id;
                const pw = Number(JSON.parse(body).pw);
                const userInfo = await userManager.logIn(id, pw);
                if (!userInfo) {
                    response.writeHead(409, 'CONFLICT');
                    return response.end('CONFLICT');
                } else {
                    const sessionData = session.getSessionID(userInfo);
                    response.writeHead(302, {
                        'Content-Type': 'text/html',
                        'Location': './index',
                        'Set-Cookie': [`sessionID = ${sessionData.sessionID}; Path = / ; Max-Age = ${60 * 60 / 2}`]
                    });
                    console.log(`user "${sessionData.id}" has logged in. sessionID = "${sessionData.sessionID}"`);
                    return response.end("set cookie");
                }
            });
        }
        if(request.url === '/index/logout'){
            response.writeHead(302, {
                'Location': '../login',
                'Content-Type': 'text/html',
                'Set-Cookie': [`sessionID = ; Path = /; Max-Age = 0`]
            });
            return response.end('redirection');
        }
        
    }else if (request.method === 'PUT'){
        if(request.url === '/index/saveData'){
            let body = '';
            request.on('data', (data) => {
                body += data;
            });
            return request.on('end', async () => {
                const id = JSON.parse(body).id;
                const userData = JSON.parse(body).userData;
                userManager.saveData(id,userData);
                response.writeHead(200);
                return response.end("saved data");
            });

        }
    
    }

    response.writeHead(404, 'NOT FOUND');
    return response.end('NOT FOUND');

});
app.listen(3000);