const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/../data/todos.json`);
const todosDB = low(adapter);

todosDB.defaults({ todos: [] }).write();

const getTodosList = (user_id, status) => {
	const todoList = todosDB
		.get('todos')
		.find({ user_id, todos_status: status })
		.value();

	return todoList;
};

module.exports = { getTodosList };
