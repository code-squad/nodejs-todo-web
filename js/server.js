const http = require('http');
const path = require('path');
const fs = require('fs');

const port = 8000;

const mimeType = {
	'.ico': 'image/x-icon',
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.eot': 'appliaction/vnd.ms-fontobject',
	'.ttf': 'aplication/font-sfnt'
};

const server = http.createServer((req, res) => {
	const method = req.method;
	const url = req.url;
	const publicPath = path.join(__dirname, '..');
	let ext = path.parse(req.url).ext;

	if (Object.keys(mimeType).includes(ext)) {
		fs.readFile(`${publicPath}${req.url}`, (error, file) => {
			if (error) {
				console.log(error);
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.write('404 file not found!');
			} else {
				res.writeHead(200, { 'Content-Type': mimeType[ext] });
				res.write(file);
			}
			res.end();
		});
	}

	if (url === '/' && method === 'GET') {
		fs.readFile('../index.html', (error, file) => {
			if (error) {
				console.log(error);
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.write('404 file not found!');
			} else {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.write(file);
			}
			res.end();
		});
	}
});

server.listen(port, () => {
	console.log(`start server ${port} port....!!`);
});
