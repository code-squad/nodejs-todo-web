const http = require('http');
const server = http.createServer();
const fs = require('fs');
const qs = require('querystring');
const User = require('./user');

const user = new User();

server.on('request', (request, response) => {
  const { method, url } = request;
  console.log(`method : ${ method }, url: ${ url }`);
  let data = '';
  let body = [];
  if (method === "GET" && url === "/") {
    response.statusCode = 200;
    data = fs.readFileSync(__dirname + '/public/index.html')
    response.write(data);
    response.end();
    return;
  }
  
  if (method === "GET" && url === "/signIn") {
    response.statusCode = 200;
    data = fs.readFileSync(__dirname + '/public/signIn.html')
    response.write(data);
    response.end();
    return;
  }

  if (method === "POST" && url === "/session") {

  }
  if (method === "POST" && url === "/user") {
    request.on('data', (chunk) => {
      body.push(chunk);
      console.log('Im here')
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log(body);
      let query = qs.parse(body);
      user.exec[method](query);
    });
  }

  response.statusCode = 404;
  response.setHeader('Content-Type', 'application/json');
  //response.write(JSON.stringify(resObject));
  response.end();
  return;
});

server.listen(3000, () => {
  console.log('3000번 포트에서 서버 열림...');
});