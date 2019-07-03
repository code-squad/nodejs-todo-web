const server = require('./server');
const hostName = 'localhost';
const portNumber = 8888;

server.listen(portNumber, hostName ,() => console.log(`Server running at http://${hostName}:${portNumber}/`));