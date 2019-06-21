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

	if (url === '/' && method === 'GET') {
		const { file, mimeType } = await fs.readFile(`${publicPath}/index.html`, ext);
		res.writeHead(200, { 'Content-Type': mimeType });
		res.end(file);
	}
});

try {
	server.listen(port, () => {
		console.log(`start server ${port} port....!!`);
	});
} catch (error) {
	console.log('error....', error);
}
