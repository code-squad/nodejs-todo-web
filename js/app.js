let data;

window.addEventListener('load', function() {
	const addTodo = this.document.querySelector('#addTodo');
	const addButton = this.document.querySelector('#addButton');
	const todos = this.document.querySelectorAll('.todos');

	addTodo.addEventListener('keyup', function(event) {
		if (event.keyCode === 13) {
			addTodoList();
		}
	});

	addButton.addEventListener('click', function(event) {
		addTodoList();
	});

	todos.forEach(element => {
		element.addEventListener('dragover', function(event) {
			allowDrop(event);
		});
	});

	todos.forEach(element => {
		element.addEventListener('drop', function(event) {
			drop(event);
		});
	});
});

const addTodoList = () => {
	const addTodo = document.querySelector('#addTodo').value;

	if (!addTodo) {
		return;
	}

	const todo = document.querySelector('#todo');
	const todoArticle = document.createElement('article');
	const todoContent = document.createTextNode(addTodo);

	todoArticle.appendChild(todoContent);
	todoArticle.className = 'todo todo-list';
	todoArticle.setAttribute('draggable', 'true');
	todoArticle.addEventListener('dragstart', function(event) {
		drag(event);
	});
	todo.appendChild(todoArticle);
	document.querySelector('#addTodo').value = '';
};

const drag = event => {
	data = event.target;
};

const allowDrop = event => {
	event.preventDefault();
};

const drop = event => {
	const dropAreaClassName = event.target.className.split(' ')[0];
	document.querySelector(`#${dropAreaClassName}`).appendChild(data);
};

const getElementMiddleY = (top, bottom) => {
	return (top + bottom) / 2;
};
