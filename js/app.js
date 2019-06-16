function TodoFront() {
	this.dragData = undefined;
}

TodoFront.prototype.load = function() {
	window.addEventListener('load', () => {
		const addTodo = document.querySelector('#addTodo');
		const addButton = document.querySelector('#addButton');
		const todos = document.querySelectorAll('.todos');
		const toss = document.querySelector('.toss');

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

		toss.addEventListener('dragover', event => {
			this.allowDrop(event);
		});

		toss.addEventListener('drop', event => {
			this.drop(event);
		});
	});
};

TodoFront.prototype.drag = function(event) {
	this.dragData = event.target;
};

TodoFront.prototype.drop = function(event) {
	const dropAreaClassName = event.target.className.split(' ')[0];

	if (dropAreaClassName === 'toss') {
		return this.deleteElement();
	}
	if (dropAreaClassName === 'list') {
		return this.dropListArea(event);
	}
	this.dropTodosArea(event, dropAreaClassName);
};

TodoFront.prototype.allowDrop = function(event) {
	event.preventDefault();
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
	todoArticle.className = 'list';
	todoArticle.setAttribute('draggable', 'true');
	todoArticle.addEventListener('dragstart', event => {
		this.drag(event);
	});
	todo.appendChild(todoArticle);
	document.querySelector('#addTodo').value = '';
};

TodoFront.prototype.deleteElement = function() {
	this.dragData.remove();
};

TodoFront.prototype.dropListArea = function(event) {
	const dropAreaId = this.getDropAreaId(event);
	this.dropBetweenElements(event, dropAreaId);
};

TodoFront.prototype.dropTodosArea = function(event, dropAreaClassName) {
	const dropAreaList = this.getDropAreaList(dropAreaClassName);
	if (!dropAreaList.length) {
		return this.dropEndElement(dropAreaClassName);
	}
	this.dropBetweenElements(event, dropAreaClassName);
};

TodoFront.prototype.dropEndElement = function(appendElement) {
	document.querySelector(`#${appendElement}`).appendChild(this.dragData);
};

TodoFront.prototype.dropBetweenElements = function(event, dropAreaId) {
	const cursorYLocation = event.clientY;
	const dropAreaList = this.getDropAreaList(dropAreaId);

	const appendTargetIndex = this.getAppendTargetIndex(dropAreaList, cursorYLocation);
	if (appendTargetIndex === -1) {
		return this.dropEndElement(dropAreaId);
	}
	document.querySelector(`#${dropAreaId}`).insertBefore(this.dragData, dropAreaList[appendTargetIndex]);
};

TodoFront.prototype.getDropAreaList = function(dropAreaId) {
	return document.querySelector(`#${dropAreaId}`).children;
};

TodoFront.prototype.getDropAreaId = function(event) {
	return event.target.parentNode.id;
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
