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

const sortingTodosList = (user_id, updateTodos) => {
	const updateTodosData = JSON.parse(updateTodos);
	updateTodosData['user_id'] = user_id;
	todosDB.sortingTodosList(updateTodosData);
};

module.exports = { getTodosList, addTodo, deleteTodos, createUserArea, deleteDragElement, sortingTodosList };
