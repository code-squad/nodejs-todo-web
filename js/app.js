let data;

window.addEventListener('load', function() {
	const addButton = this.document.querySelector('#addButton');
	const dropAreas = this.document.querySelectorAll('.dropArea');

	addButton.addEventListener('click', function(event) {
		addTodoList();
	});

	dropAreas.forEach(element => {
		element.addEventListener('dragover', function(event) {
			allowDrop(event);
		});
	});

	dropAreas.forEach(element => {
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

const drop = event => {
	event.preventDefault();
	event.target.appendChild(data);
};

const allowDrop = event => {
	event.preventDefault();
};
