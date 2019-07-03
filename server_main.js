const http = require('http');
const fs = require('fs');
const cookie = require('cookie');
const UserManager = require('./user_manager.js');
const Session = require('./session.js');
const Parser = require('./parser.js');
const Controller = require('./app/controller.js');
const userManager = new UserManager(fs);
const session = new Session();
const parser = new Parser();
const port = 3000;
const httpStatusCode = {
    'OK': 200,
    'MOVED PERMANENTLY': 301,
    'FOUND' : 302,
    'NOT FOUND': 404,
    'CONFLICT': 409,
    'INTERNAL SERER ERROR': 500
}
const controller = new Controller(httpStatusCode, fs, session, cookie, userManager);


const server = http.createServer(async (request, response) => {
    try {
        const [url, extension] = parser.parseUrl(request.url);
        let status;

        console.log(request.method, request.url);
        if (extension) { 
            await controller.static(request, response, request.url);
        }

        if (request.method === 'GET') {
            await controller.get(request, response, url);
        }

        if (request.method === 'POST') {
            await controller.post(request, response, url);
        }

        if (request.method === 'PUT') {
            await controller.put(request, response, url);
        }

    } catch (err) {
        const status = 'INTERNAL SERVER ERROR';
        controller.error(request, response, status);

    }


});
server.listen(port);