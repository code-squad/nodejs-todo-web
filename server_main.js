const http = require('http');
const fs = require('fs');
const cookie = require('cookie');
const UserManager = require('./user_manager.js');
const Session = require('./session.js');
const Controller = require('./app/controller.js');
const userManager = new UserManager(fs);
const session = new Session();
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
        console.log(request.method, request.url);
        controller.app(request,response);
    } catch (err) {
        const status = 'INTERNAL SERVER ERROR';
        controller.error(request, response, status);

    }


});
server.listen(port);