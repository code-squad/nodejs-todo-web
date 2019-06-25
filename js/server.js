const http = require('http');
const path = require('path');
const fs = require('./file.js');

const port = 8000;

const server = http.createServer(async (req, res) => {
	const method = req.method;
	const url = req.url;
	const publicPath = path.join(__dirname, '..');
	let ext = path.parse(req.url).ext;

	if (!ext) {
		ext = '.html';
	}

	try {
		if (url === '/' && method === 'GET') {
			const { file, mimeType } = await fs.readFile(`${publicPath}/index${ext}`, ext);
			res.writeHead(200, { 'Content-Type': mimeType });
			res.end(file);
		} else if (url === '/login' && method === 'GET') {
			const { file, mimeType } = await fs.readFile(`${publicPath}${url}${ext}`, ext);
			res.writeHead(200, { 'Content-Type': mimeType });
			res.end(file);
		} else {
			const { file, mimeType } = await fs.readFile(`${publicPath}${url}`, ext);
			res.writeHead(200, { 'Content-Type': mimeType });
			res.end(file);
		}
	} catch (error) {
		console.log('error.....', error);
		const { file, mimeType } = await fs.readFile(`${publicPath}/error-404${ext}`, ext);
		res.writeHead(404, { 'Content-Type': mimeType });
		res.end(file);
	}
});

server.listen(port, () => {
	console.log(`start server ${port} port....!!`);
});
