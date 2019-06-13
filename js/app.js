let data;

window.addEventListener('load', function() {
	const addButton = this.document.querySelector('#addButton');
	const todos = this.document.querySelectorAll('.todos');

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
	todoArticle.className = 'todo-list';
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
	dropAreaClassName = event.target.className;

	if (dropAreaClassName === 'todos') {
		event.preventDefault();
		event.target.children[1].appendChild(data);
	} else if (dropAreaClassName === 'todo-list') {
		event.preventDefault();
		event.target.parentNode.parentNode.children[1].appendChild(data);
	} else {
		event.preventDefault();
		event.target.parentNode.children[1].appendChild(data);
	}
};
