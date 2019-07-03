const path = require('path');
const fs = require('./file.js');
const member = require('./member.js');
const todos = require('./todos.js');
const urlList = require('../data/url.js');

const publicPath = path.join(__dirname, '..');

try {
	module.exports.get = async (url, req, res) => {
		const ext = path.parse(url).ext;

		if (ext) {
			const { file, mimeType } = await fs.readFile(`${publicPath}${url}`, ext);
			res.writeHead(200, { 'Content-Type': mimeType });
			return res.end(file);
		}
		if (url === '/error-500') {
			// use(url, req, res);
		}
		if (readFileUrl(url)) {
			const fileName = readFileUrl(url);
			const { file, mimeType } = await fs.readFile(`${publicPath}${fileName}`, '.html');
			res.writeHead(200, { 'Content-Type': mimeType });
			return res.end(file);
		}
		if (url === '/permission') {
			if (!req.headers.cookie) {
				return res.end('false');
			}
			const userId = member.getUserId(req.headers.cookie);
			if (!userId) {
				return res.end('false');
			}
			return res.end(userId);
		}
		if (url.startsWith('/todos')) {
			const user_id = url.split('/')[2];
			const todosList = todos.getTodosList(user_id);
			return res.end(JSON.stringify(todosList));
		}
	};

	module.exports.post = async (url, req, res) => {
		if (url === '/auth') {
			req.on('data', loginData => {
				const user_sid = member.login(loginData);
				if (!user_sid) {
					return res.end('false');
				}
				res.writeHead(200, { 'Set-Cookie': [`sid=${user_sid}; Max-Age=${60 * 60 * 24}; HttpOnly;`] });
				return res.end('true');
			});
		}
		if (url === '/users') {
			req.on('data', signUpData => {
				const { user_sid, user_id } = member.signUp(signUpData);
				todos.createUserArea(user_id);
				if (!user_sid) {
					return res.end('false');
				}
				res.writeHead(302, { 'Set-Cookie': [`sid=${user_sid}; Max-Age=${60 * 60 * 24}; HttpOnly;`], Location: '/' });
				return res.end();
			});
		}
		if (url === '/todo') {
			req.on('data', addTodoData => {
				const addedTodo = todos.addTodo(addTodoData);
				return res.end(JSON.stringify(addedTodo));
			});
		}
	};

	module.exports.put = async (url, req, res) => {
		if (url.startsWith('/events')) {
			const user_id = url.split('/')[2];
			req.on('data', updateTodosData => {
				todos.sortingTodosList(user_id, updateTodosData);
				return res.end();
			});
		}
	};

	module.exports.del = async (url, req, res) => {
		if (url === '/users') {
			member.logout(req.headers.cookie);
			res.writeHead(302, { 'Set-Cookie': [`sid=; Max-Age=0; HttpOnly;`], Location: '/' });
			return res.end();
		}
		if (url.startsWith('/todos')) {
			const user_id = url.split('/')[2];
			const todos_id = url.split('/')[3];
			const deleteTodos = { user_id, todos_id };
			todos.deleteTodos(deleteTodos);
			return res.end();
		}
	};

	module.exports.use = async (url, req, res) => {
		const statusCode = url.slice(6);
		const { file, mimeType } = await fs.readFile(`${publicPath}${url}.html`, '.html');
		res.writeHead(statusCode, { 'Content-Type': mimeType });
		return res.end(file);
	};

	const readFileUrl = url => {
		if (Object.keys(urlList).includes(url)) {
			return urlList[url];
		}
		return false;
	};
} catch (error) {
	console.log('error .....', error);
	use('/error-404', req, res);
}
