const http = require('http');
const path = require('path');
const fs = require('fs');

const port = 8000;

const server = http.createServer((req, res) => {
	if (req.url === '/' && req.method === 'GET') {
		fs.readFile('../index.html', (error, file) => {
			if (error) {
				throw new Error('파일로드오류');
			}
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(file);
		});
	}
});

server.listen(port, () => {
	console.log(`start server ${port} port....!!`);
});
