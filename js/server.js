const http = require('http');
const path = require('path');
const fs = require('./file.js');
const member = require('./member.js');
const todos = require('./todos.js');

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
		if (url === '/') {
			const { file, mimeType } = await fs.readFile(`${publicPath}/index.html`, ext);
			res.writeHead(200, { 'Content-Type': mimeType });
			res.end(file);
		} else if (url === '/auth') {
			if (method === 'GET') {
				const { file, mimeType } = await fs.readFile(`${publicPath}/login.html`, ext);
				res.writeHead(200, { 'Content-Type': mimeType });
				res.end(file);
			} else if (method === 'POST') {
				req.on('data', loginData => {
					const user_sid = member.login(loginData);
					if (!user_sid) {
						res.end('false');
					} else {
						res.writeHead(200, { 'Set-Cookie': [`sid=${user_sid}; Max-Age=${60 * 60 * 24}; HttpOnly;`] });
						res.end('true');
					}
				});
			}
		} else if (url === '/users') {
			if (method === 'GET') {
				const { file, mimeType } = await fs.readFile(`${publicPath}/sign-up.html`, ext);
				res.writeHead(200, { 'Content-Type': mimeType });
				res.end(file);
			} else if (method === 'POST') {
				req.on('data', signUpData => {
					const { user_sid, user_id } = member.signUp(signUpData);
					todos.createUserArea(user_id);
					if (!user_sid) {
						res.end('false');
					}
					res.writeHead(302, { 'Set-Cookie': [`sid=${user_sid}; Max-Age=${60 * 60 * 24}; HttpOnly;`], Location: '/' });
					res.end();
				});
			} else if (method === 'DELETE') {
				member.logout(req.headers.cookie);
				res.writeHead(302, { 'Set-Cookie': [`sid=; Max-Age=0; HttpOnly;`], Location: '/' });
				res.end();
			}
		} else if (url === '/permission' && method === 'GET') {
			if (!req.headers.cookie) {
				res.end('false');
			} else {
				const userId = member.getUserId(req.headers.cookie);
				if (!userId) {
					res.end('false');
				}
				res.end(userId);
			}
		} else if (url === '/todo' && method === 'POST') {
			req.on('data', addTodoData => {
				const addedTodo = todos.addTodo(addTodoData);
				res.end(JSON.stringify(addedTodo));
			});
		} else if (url.startsWith('/todos')) {
			if (method === 'GET') {
				const user_id = url.split('/')[2];
				const todosList = todos.getTodosList(user_id);
				res.end(JSON.stringify(todosList));
			} else if (method === 'DELETE') {
				const user_id = url.split('/')[2];
				const todos_id = url.split('/')[3];
				const deleteTodos = { user_id, todos_id };
				todos.deleteTodos(deleteTodos);
				res.end();
			}
		} else if (url.startsWith('/events')) {
			if (method === 'DELETE') {
				const user_id = url.split('/')[2];
				const todos_id = url.split('/')[3];
				const dragData = { user_id, todos_id };
				todos.deleteDragElement(dragData);
				res.end();
			}
		} else if (url === '/error-500' && method === 'GET') {
			const { file, mimeType } = await fs.readFile(`${publicPath}/error-500.html`, ext);
			res.writeHead(200, { 'Content-Type': mimeType });
			res.end(file);
		} else {
			const { file, mimeType } = await fs.readFile(`${publicPath}${url}`, ext);
			res.writeHead(200, { 'Content-Type': mimeType });
			res.end(file);
		}
	} catch (error) {
		console.log('error.....', error);
		const { file, mimeType } = await fs.readFile(`${publicPath}/error-404.html`, ext);
		res.writeHead(404, { 'Content-Type': mimeType });
		res.end(file);
	}
});

server.listen(port, () => {
	console.log(`start server ${port} port....!!`);
});
