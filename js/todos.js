const todosDB = require('./todosDB.js');

const getTodosList = user_id => {
	const todosList = todosDB.getTodosList(JSON.parse(user_id));
	return todosList;
};

const addTodoList = addTodoData => {
	const addedTodoList = todosDB.addTodoList(JSON.parse(addTodoData));
	return addedTodoList;
};

module.exports = { getTodosList, addTodoList };
