var http = require('http');
var fs = require('fs');
var app = http.createServer((request, response) => {
    if (request.method === 'GET') {
        let url = request.url;
        if (request.url === "/login" || request.url === '/') {
        // if (request.url === '/') {
            url = '/login.html';
            response.writeHead(200);
            response.end(fs.readFileSync(__dirname + url));
        }
        return fs.readFile(`.${request.url}`, (err, data) => {
            if (err) {
                response.writeHead(404, 'NOT FOUND');
                return response.end('NOT FOUND');
            }
            return response.end(data);
        });
    }
    // console.log(request);

    response.writeHead(404, 'NOT FOUND');
    return response.end('NOT FOUND');

    // var url = request.url;
    // if(request.url === '/'){
    //   url = '/login.html';
    // }
    // // if(request.url == '/favicon.ico'){
    // //     response.writeHead(404);
    // //     response.end();
    // //     return response.writeHead(404);
    // // }
    // response.writeHead(200); // 200 : ok
    // response.end(fs.readFileSync(__dirname + url));
    // var url = request.url;
    // if(request.url == '/'){
    //   url = '/login.html';
    // }
    // if(request.url == '/favicon.ico'){
    //     response.writeHead(404);
    //     response.end();
    //     return response.writeHead(404);
    // }
    // response.writeHead(200); // 200 : ok
    // response.end(fs.readFileSync(__dirname + url));

});
app.listen(3000);