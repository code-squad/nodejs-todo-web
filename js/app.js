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
	const dropAreaList = document.querySelector(`#${dropAreaClassName}`).children;

	if (!dropAreaList.length) {
		document.querySelector(`#${dropAreaClassName}`).appendChild(data);
	} else {
		const cursorYLocation = event.clientY;
		const appendTargetIndex = getAppendTargetIndex(dropAreaList, cursorYLocation);

		if (appendTargetIndex === -1) {
			document.querySelector(`#${dropAreaClassName}`).appendChild(data);
		} else {
			document.querySelector(`#${dropAreaClassName}`).insertBefore(data, dropAreaList[appendTargetIndex]);
		}
	}
};

const getElementMiddleY = element => {
	const elementLocation = element.getBoundingClientRect();
	return (elementLocation.top + elementLocation.bottom) / 2;
};

const getAppendTargetIndex = (dropAreaList, cursorYLocation) => {
	const appendTargetIndex = Array.from(dropAreaList).findIndex(element => {
		const elementMiddleY = getElementMiddleY(element);

		return elementMiddleY >= cursorYLocation;
	});

	return appendTargetIndex;
};
