const todosDB = require('./todosDB.js');

const getTodosList = user_id => {
	const todosList = todosDB.getTodosList(user_id);
	return todosList;
};

module.exports = { getTodosList };
