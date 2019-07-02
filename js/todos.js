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

const createUserArea = user_id => {
	todosDB.createUserArea(user_id);
};

const deleteDragElement = dragData => {
	todosDB.deleteDragElement(dragData);
};

module.exports = { getTodosList, addTodo, deleteTodos, createUserArea, deleteDragElement };
