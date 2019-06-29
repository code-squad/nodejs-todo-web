const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/../data/todos.json`);
const todosDB = low(adapter);

todosDB.defaults({ todos: [] }).write();

const getTodosList = user_id => {
	const todoList = todosDB
		.get('todos')
		.filter({ user_id })
		.value();

	return todoList;
};

const addTodoList = addTodoData => {
	const { user_id, todos_id, todos_status, todos_contents } = addTodoData;

	const addTodoList = todosDB
		.get('todos')
		.push({ user_id, todos_id, todos_status, todos_contents })
		.write();

	return addTodoList;
};

const getTodoList = todos_id => {
	const todoList = todosDB
		.get('todos')
		.filter({ todos_id })
		.value();

	return todoList;
};

module.exports = { getTodosList, addTodoList };
