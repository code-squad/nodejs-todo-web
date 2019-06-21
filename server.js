const httpState = require('./http_state');
const utility   = require('./utility');
const mime      = require('./mime');
const http      = require('http');
const path      = require('path');
const fs        = require('fs');

const loadStaticFile = (request, response) => {
    const extension = utility.parse(request.url);
    response.writeHeader(httpState.OK, {'Content-Type': mime[extension]});
    fs.createReadStream(path.join(__dirname, request.url)).pipe(response);
}

const serverEventEmitter = http.createServer((request, response) => {
    switch (request.method) {
        case 'GET': loadStaticFile(request, response); break;
    }
});

module.exports = serverEventEmitter;
