const server = require('./server');
const hostName = 'localhost';
const portNumber = 8080;

server.listen(portNumber, hostName ,() => console.log(`Server running at http://${hostName}:${portNumber}/`));