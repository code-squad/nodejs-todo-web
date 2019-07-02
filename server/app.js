const http = require('http');

const server = http.createServer();

server.on('request', (request, response) => {
  const { method, url } = request;
  console.log(`method : ${ method }, url: ${ url }`);
  const resObject = {};
  if (method === "GET" && url === "/") {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    resObject.action = '여기가 홈페이지여';
    response.write(JSON.stringify(resObject));
    response.end();
    return;
  }
  response.statusCode = 404;
  response.setHeader('Content-Type', 'application/json');
  resObject.action = '여긴 암것도 업따. 돌아가렴';
  response.write(JSON.stringify(resObject));
  response.end();
  return;
});

server.listen(3000, () => {
  console.log('3000번 포트에서 서버 열림...');
});