const http = require('http');
const server = http.createServer();
const fs = require('fs');
const qs = require('querystring');

server.on('request', (request, response) => {
  const { method, url } = request;
  console.log(`method : ${ method }, url: ${ url }`);
  let data = '';
  let body = [];

  if (method === "GET" && url === "/") {
    response.statusCode = 200;
    //response.setHeader('Content-Type', 'application/json');
    data = fs.readFileSync(__dirname + '/public/index.html')
    response.write(data);
    response.end();
    return;
  }
  
  if (method === "GET" && url === "/signIn") {

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
      let { username, password } = qs.parse(body);
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