const stateCode = require('./state_code');
const http = require('http');

const serverEventEmitter = http.createServer((request, response) => {
    request.on('error', (error) => {
        console.error(error);
        response.statusCode = stateCode['BAD_REQUEST'];
        response.end();
    });

    response.on('error', (error) => console.error(error));

    if (request.method === 'GET' && request.url === '/') {
        request.pipe(response);
    } else {
        response.statusCode = stateCode['NOT_FOUND'];
        response.end();
    }
});

module.exports = serverEventEmitter;
