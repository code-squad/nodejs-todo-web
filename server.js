const path = require('path');
const fs = require('./file.js');
const member = require('./member.js');
const todos = require('./public/js/todos.js');
const urlList = require('./url.js');

const publicPath = path.join(__dirname, './public');

const get = async (url, req, res) => {
	const ext = path.parse(url).ext;

	try {
		if (ext) {
			const { file, mimeType } = await fs.readFile(`${publicPath}${url}`, ext);
			if (!file || !mimeType) {
				throw new Error('FILE DOES NOT EXIST');
			}
			res.writeHead(200, { 'Content-Type': mimeType });
			return res.end(file);
		}
		if (readFileUrl(url)) {
			const fileName = readFileUrl(url);
			const { file, mimeType } = await fs.readFile(`${publicPath}${fileName}`, '.html');
			if (!file || !mimeType) {
				throw new Error('FILE DOES NOT EXIST');
			}
			res.writeHead(200, { 'Content-Type': mimeType });
			return res.end(file);
		}
	} catch (error) {
		throw error;
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
	if (url === '/error-500') {
		return use(url, req, res);
	}
	return use('/error-404', req, res);
};

const post = async (url, req, res) => {
	if (url === '/auth') {
		req.on('data', loginData => {
			const user_sid = member.login(loginData);
			if (!user_sid) {
				return res.end();
			}
			res.writeHead(302, { 'Set-Cookie': [`sid=${user_sid}; Max-Age=${60 * 60 * 24}; HttpOnly;`], Location: '/' });
			return res.end();
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

const put = async (url, req, res) => {
	if (url.startsWith('/events')) {
		const user_id = url.split('/')[2];
		req.on('data', updateTodosData => {
			todos.sortingTodosList(user_id, updateTodosData);
			return res.end();
		});
	}
};

const del = async (url, req, res) => {
	if (url === '/users') {
		member.logout(req.headers.cookie);
		res.writeHead(303, { 'Set-Cookie': [`sid=; Max-Age=0; HttpOnly;`], Location: '/' });
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

const use = async (url, req, res) => {
	try {
		const statusCode = url.slice(7);
		const { file, mimeType } = await fs.readFile(`${publicPath}${url}.html`, '.html');
		if (!file || !mimeType) {
			throw new Error('FILE DOES NOT EXIST');
		}
		res.writeHead(statusCode, { 'Content-Type': mimeType });
		return res.end(file);
	} catch (error) {
		throw error;
	}
};

const readFileUrl = url => {
	if (Object.keys(urlList).includes(url)) {
		return urlList[url];
	}
	return false;
};

module.exports = { get, post, put, del, use };
