function TodoFront() {
	this.dragData = undefined;
}

TodoFront.prototype.load = function() {
	window.addEventListener('load', () => {
		const addTodo = document.querySelector('#addTodo');
		const addButton = document.querySelector('#addButton');
		const todos = document.querySelectorAll('.todos');
		const toss = document.querySelectorAll('.toss');

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

		toss.forEach(element => {
			element.addEventListener('dragover', event => {
				this.allowDrop(event);
			});
		});

		toss.forEach(element => {
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
	todoArticle.className = 'todo-list';
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
	if (dropAreaClassName === 'todo-list') {
		this.dropBetweenElements(event);
	} else {
		const dropAreaList = document.querySelector(`#${dropAreaClassName}`).children;
		if (!dropAreaList.length) {
			this.dropAppendElement(dropAreaClassName);
		} else {
			this.dropBetweenElements(event);
		}
	}
};

TodoFront.prototype.dropAppendElement = function(appendElement) {
	document.querySelector(`#${appendElement}`).appendChild(this.dragData);
};

TodoFront.prototype.dropBetweenElements = function(event) {
	const cursorYLocation = event.clientY;
	const dropAreaId = event.target.parentNode.id;
	const dropAreaList = document.querySelector(`#${dropAreaId}`).children;

	const appendTargetIndex = this.getAppendTargetIndex(dropAreaList, cursorYLocation);
	if (appendTargetIndex === -1) {
		this.dropAppendElement(dropAreaId);
	} else {
		document.querySelector(`#${dropAreaId}`).insertBefore(this.dragData, dropAreaList[appendTargetIndex]);
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

TodoFront.prototype.deleteElement = function() {
	this.dragData.remove();
};

const todoFront = new TodoFront();
todoFront.load();
