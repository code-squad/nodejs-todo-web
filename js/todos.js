const todosDB = require('./todosDB.js');

const getTodosList = user_id => {
	const todosList = todosDB.getTodosList(JSON.parse(user_id));
	return todosList;
};

const addTodo = addTodoData => {
	const addedTodo = todosDB.addTodo(JSON.parse(addTodoData));
	return addedTodo;
};

module.exports = { getTodosList, addTodo };
