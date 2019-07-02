const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`${__dirname}/../data/todos.json`);
const todosDB = low(adapter);

const createUserArea = user_id => {
	todosDB.defaults({ [user_id]: [] }).write();
};

const getTodosList = user_id => {
	const todosList = todosDB.get(user_id).value();
	return todosList;
};

const addTodo = addTodoData => {
	addTodoData['todos_id'] = makeTodosId();
	const { user_id, todos_id, todos_status, todos_contents } = addTodoData;
	todosDB
		.get(user_id)
		.push({ todos_id, todos_status, todos_contents })
		.write();

	const addedTodo = getTodos({ user_id, todos_id });
	return addedTodo;
};

const deleteTodos = deleteTodoData => {
	const { user_id, todos_id } = deleteTodoData;
	todosDB
		.get(user_id)
		.remove({ todos_id: Number(todos_id) })
		.write();
};

const getTodos = todosData => {
	const { user_id, todos_id } = todosData;
	const todos = todosDB
		.get(user_id)
		.filter({ todos_id })
		.value();

	return todos;
};

const deleteDragElement = dragData => {
	const { user_id, todos_id } = dragData;
	const todosList = getTodosList(user_id);
	const deletedDragElement = todosList.filter(todos => {
		return todos.todos_id !== Number(todos_id);
	});

	todosDB.set(`${user_id}`, deletedDragElement).write();
};

const makeTodosId = () => {
	const min = 1000;
	const max = 9999;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = { getTodosList, addTodo, deleteTodos, createUserArea, deleteDragElement };
