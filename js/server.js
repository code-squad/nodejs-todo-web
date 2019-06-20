const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

const port = 8000;

const server = http.createServer((req, res) => {
	const pathname = url.parse(req.url).pathname;
	const method = req.method;
	const ext = path.parse(req.url).ext;

	if (!ext) {
		ext = '.html';
	}

	if (pathname === '/' && method === 'GET') {
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
