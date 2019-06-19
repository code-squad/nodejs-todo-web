const server = require('./server');
const portNumber = 8080;

server.listen(portNumber, () => console.log(`${portNumber}번 포트의 서버가 대기중입니다..`) );