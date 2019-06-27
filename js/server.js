const http = require('http');
const path = require('path');
const fs = require('./file.js');
const member = require('./member.js');

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
		} else if (url === '/isLoggedIn' && method === 'GET') {
			if (!req.headers.cookie) {
				res.end('false');
			} else {
				const isValidMember = member.isValidLoggedIn(req.headers.cookie);
				if (!isValidMember) {
					res.end('false');
				}
			}
		} else if (url === '/login' && method === 'POST') {
			req.on('data', loginData => {
				const memberInfo = member.login(loginData);
				if (!memberInfo) {
					res.end('false');
				} else {
					res.writeHead(200, { 'Set-Cookie': [`sid=${memberInfo.user_sid}; Max-Age=${60 * 60 * 24}; HttpOnly;`] });
					res.end('true');
				}
			});
		} else if (url === '/signUp' && method === 'GET') {
			const { file, mimeType } = await fs.readFile(`${publicPath}/sign-up${ext}`, ext);
			res.writeHead(200, { 'Content-Type': mimeType });
			res.end(file);
		} else if (url === '/signUp' && method === 'POST') {
			req.on('data', signUpData => {
				const user_sid = member.signUp(signUpData);
				if (!user_sid) {
					res.end('false');
				}
				res.writeHead(302, { 'Set-Cookie': [`sid=${user_sid}; Max-Age=${60 * 60 * 24}; HttpOnly;`], Location: '/' });
				res.end();
			});
		} else if (url === '/error-500' && method === 'GET') {
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
