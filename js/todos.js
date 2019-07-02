const todosDB = require('./todosDB.js');

const getTodosList = user_id => {
	const todosList = todosDB.getTodosList(user_id);
	return todosList;
};

const addTodo = addTodoData => {
	const addedTodo = todosDB.addTodo(JSON.parse(addTodoData));
	return addedTodo;
};

const deleteTodos = deleteTodoData => {
	todosDB.deleteTodos(deleteTodoData);
};

module.exports = { getTodosList, addTodo, deleteTodos };
