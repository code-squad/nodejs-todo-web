const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/../data/todos.json`);
const todosDB = low(adapter);

todosDB.defaults({ todos: [] }).write();

const getTodosList = user_id => {
	const todosList = todosDB
		.get('todos')
		.filter({ user_id })
		.value();

	return todosList;
};

const addTodo = addTodoData => {
	addTodoData['todos_id'] = makeTodosId();
	const { user_id, todos_id, todos_status, todos_contents } = addTodoData;
	todosDB
		.get('todos')
		.push({ user_id, todos_id, todos_status, todos_contents })
		.write();

	const addedTodo = getTodos(todos_id);
	return addedTodo;
};

const getTodos = todos_id => {
	const todos = todosDB
		.get('todos')
		.filter({ todos_id })
		.value();

	return todos;
};

const makeTodosId = () => {
	const min = 1000;
	const max = 9999;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { getTodosList, addTodo };
