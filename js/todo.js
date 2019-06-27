function TodoFront() {
	this.dragData = undefined;
}

TodoFront.prototype.load = function() {
	window.addEventListener('load', () => {
		const addTodo = document.querySelector('#addTodo');
		const addButton = document.querySelector('#addButton');
		const todos = document.querySelectorAll('.todos');
		const toss = document.querySelectorAll('.toss');

		this.setAuthButton();

		addTodo.addEventListener('click', event => {
			this.isValidLoggedIn();
		});

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

TodoFront.prototype.makeLoginButton = function() {
	const loginButton = document.createElement('button');
	loginButton.setAttribute('type', 'button');
	loginButton.setAttribute('id', 'loginButton');
	loginButton.setAttribute('class', 'btn btn-outline-danger');
	loginButton.innerHTML = '로그인';
	loginButton.addEventListener('click', event => {
		location.href = '/login';
	});

	return loginButton;
};

TodoFront.prototype.makeSignUpButton = function() {
	const signUpButton = document.createElement('button');
	signUpButton.setAttribute('type', 'button');
	signUpButton.setAttribute('id', 'signUpButton');
	signUpButton.setAttribute('class', 'btn btn-outline-success');
	signUpButton.innerHTML = '회원가입';
	signUpButton.addEventListener('click', event => {
		location.href = '/signUp';
	});

	return signUpButton;
};

TodoFront.prototype.setAuthButton = async function() {
	const isLoggedIn = await this.isValidLoggedIn();
	if (isLoggedIn) {
		this.appendLoggedInButton();
	}
};

TodoFront.prototype.isValidLoggedIn = async function(event) {
	try {
		const response = await fetch('/isValidLoggedIn');
		if (response.ok) {
			const validMember = await response.text();
			if (validMember === 'false') {
				return false;
			}
			return true;
		} else {
			location.href = '/error-404';
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
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

TodoFront.prototype.addTodoList = async function() {
	const isValidAccess = await this.isValidLoggedIn();
	if (!isValidAccess) {
		alert('로그인이 필요합니다.');
		document.querySelector('#addTodo').value = '';
		return;
	}

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
	event.stopPropagation();
	const dropAreaId = this.getDropAreaId(event);
	this.dropBetweenElements(event, dropAreaId);
};

TodoFront.prototype.dropTodosArea = function(event, dropAreaClassName) {
	event.stopPropagation();
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
