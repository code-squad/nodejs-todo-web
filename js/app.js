function TodoFront() {
	this.dragData = undefined;
}

TodoFront.prototype.load = function() {
	window.addEventListener('load', () => {
		const addTodo = document.querySelector('#addTodo');
		const addButton = document.querySelector('#addButton');
		const todos = document.querySelectorAll('.todos');

		addTodo.addEventListener('keyup', event => {
			if (event.keyCode === 13) {
				this.addTodoList();
			}
		});

		addButton.addEventListener('click', event => {
			this.addTodoList();
		});

		todos.forEach(element => {
			element.addEventListener('dragover', event => {
				this.allowDrop(event);
			});
		});

		todos.forEach(element => {
			element.addEventListener('drop', event => {
				this.drop(event);
			});
		});
	});
};

TodoFront.prototype.addTodoList = function() {
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
	todoArticle.addEventListener('dragstart', event => {
		this.drag(event);
	});
	todo.appendChild(todoArticle);
	document.querySelector('#addTodo').value = '';
};

TodoFront.prototype.drag = function(event) {
	this.dragData = event.target;
};

TodoFront.prototype.allowDrop = function(event) {
	event.preventDefault();
};

TodoFront.prototype.drop = function(event) {
	const dropAreaClassName = event.target.className.split(' ')[0];
	const dropAreaList = document.querySelector(`#${dropAreaClassName}`).children;

	if (!dropAreaList.length) {
		document.querySelector(`#${dropAreaClassName}`).appendChild(this.dragData);
	} else {
		const cursorYLocation = event.clientY;
		const appendTargetIndex = this.getAppendTargetIndex(dropAreaList, cursorYLocation);

		if (appendTargetIndex === -1) {
			document.querySelector(`#${dropAreaClassName}`).appendChild(this.dragData);
		} else {
			document.querySelector(`#${dropAreaClassName}`).insertBefore(this.dragData, dropAreaList[appendTargetIndex]);
		}
	}
};

TodoFront.prototype.getElementMiddleY = function(element) {
	const elementLocation = element.getBoundingClientRect();
	return (elementLocation.top + elementLocation.bottom) / 2;
};

TodoFront.prototype.getAppendTargetIndex = function(dropAreaList, cursorYLocation) {
	const appendTargetIndex = Array.from(dropAreaList).findIndex(element => {
		const elementMiddleY = this.getElementMiddleY(element);

		return elementMiddleY >= cursorYLocation;
	});

	return appendTargetIndex;
};

const todoFront = new TodoFront();
todoFront.load();
