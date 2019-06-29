const todosDB = require('./todosDB.js');

const getTodosList = user_id => {
	const todosList = todosDB.getTodosList(JSON.parse(user_id));
	return todosList;
};

const makeTodosId = () => {
	const min = 1000;
	const max = 9999;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { getTodosList };
