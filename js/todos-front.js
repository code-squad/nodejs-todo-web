function TodosFront() {
	this.dragData = null;
	this.userId = null;
}

TodosFront.prototype.load = function() {
	window.addEventListener('load', async () => {
		const addTodo = document.querySelector('#addTodo');
		const addButton = document.querySelector('#addButton');
		const todos = document.querySelectorAll('.todos');
		const toss = document.querySelectorAll('.toss');

		await this.setAuthButton();
		await this.getTodosList();

		addTodo.addEventListener('click', event => {
			this.warning();
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

TodosFront.prototype.getTodosList = async function() {
	const response = await fetch('/todosList', { method: 'POST', body: JSON.stringify(this.userId) });
	try {
		if (response.ok) {
			const todosList = await response.text();
			if (todosList) {
			}
		} else {
			location.href = '/error-404';
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

TodosFront.prototype.appendLoggedInButton = function() {
	const authButton = document.querySelector('#authButton');
	authButton.appendChild(this.getLoggedInUserId());
	authButton.appendChild(this.makeLogoutButton());
};

TodosFront.prototype.makeLoginButton = function() {
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

TodosFront.prototype.makeSignUpButton = function() {
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

TodosFront.prototype.appendLoggedOutButton = function() {
	const authButton = document.querySelector('#authButton');
	authButton.appendChild(this.makeLoginButton());
	authButton.appendChild(this.makeSignUpButton());
};

TodosFront.prototype.makeLogoutButton = function() {
	const logoutButton = document.createElement('button');
	logoutButton.setAttribute('type', 'button');
	logoutButton.setAttribute('id', 'logoutButton');
	logoutButton.setAttribute('class', 'btn btn-outline-secondary');
	logoutButton.innerHTML = '로그아웃';
	logoutButton.addEventListener('click', event => {
		this.userId = null;
		location.href = '/logout';
	});

	return logoutButton;
};

TodosFront.prototype.getLoggedInUserId = function() {
	const userIdArea = document.createElement('span');
	userIdArea.setAttribute('id', 'userId');
	userIdArea.innerHTML = `${this.userId} 님`;

	return userIdArea;
};

TodosFront.prototype.setAuthButton = async function() {
	const isLoggedIn = await this.isValidLoggedIn();
	if (isLoggedIn) {
		return this.appendLoggedInButton();
	}
	return this.appendLoggedOutButton();
};

TodosFront.prototype.warning = async function() {
	const isLoggedIn = await this.isValidLoggedIn();
	if (!isLoggedIn) {
		alert('로그인이 필요합니다.');
		document.querySelector('#addTodo').value = '';
		return;
	}
};

TodosFront.prototype.isValidLoggedIn = async function(event) {
	try {
		const response = await fetch('/isValidLoggedIn');
		if (response.ok) {
			const userId = await response.text();
			if (userId === 'false') {
				return false;
			}
			this.userId = userId;
			return true;
		} else {
			location.href = '/error-404';
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

TodosFront.prototype.drag = function(event) {
	this.dragData = event.target;
};

TodosFront.prototype.drop = function(event) {
	const dropAreaClassName = event.target.className.split(' ')[0];

	if (dropAreaClassName === 'toss') {
		return this.deleteElement();
	}
	if (dropAreaClassName === 'list') {
		return this.dropListArea(event);
	}
	this.dropTodosArea(event, dropAreaClassName);
};

TodosFront.prototype.allowDrop = function(event) {
	event.preventDefault();
};

TodosFront.prototype.addTodoList = function() {
	this.warning();

	const addTodo = document.querySelector('#addTodo').value;
	if (!addTodo) {
		return;
	}

	this.makeTodosList('todo', addTodo);
	document.querySelector('#addTodo').value = '';
};

TodosFront.prototype.makeTodosList = function(status, contents) {
	const todos = document.querySelector(`#${status}`);
	const todosArticle = document.createElement('article');
	const todoContents = document.createTextNode(contents);

	todosArticle.appendChild(todoContents);
	todosArticle.className = 'list';
	todosArticle.setAttribute('draggable', 'true');
	todosArticle.addEventListener('dragstart', event => {
		this.drag(event);
	});
	todos.appendChild(todosArticle);
};

TodosFront.prototype.deleteElement = function() {
	this.dragData.remove();
};

TodosFront.prototype.dropListArea = function(event) {
	event.stopPropagation();
	const dropAreaId = this.getDropAreaId(event);
	this.dropBetweenElements(event, dropAreaId);
};

TodosFront.prototype.dropTodosArea = function(event, dropAreaClassName) {
	event.stopPropagation();
	const dropAreaList = this.getDropAreaList(dropAreaClassName);
	if (!dropAreaList.length) {
		return this.dropEndElement(dropAreaClassName);
	}
	this.dropBetweenElements(event, dropAreaClassName);
};

TodosFront.prototype.dropEndElement = function(appendElement) {
	document.querySelector(`#${appendElement}`).appendChild(this.dragData);
};

TodosFront.prototype.dropBetweenElements = function(event, dropAreaId) {
	const cursorYLocation = event.clientY;
	const dropAreaList = this.getDropAreaList(dropAreaId);

	const appendTargetIndex = this.getAppendTargetIndex(dropAreaList, cursorYLocation);
	if (appendTargetIndex === -1) {
		return this.dropEndElement(dropAreaId);
	}
	document.querySelector(`#${dropAreaId}`).insertBefore(this.dragData, dropAreaList[appendTargetIndex]);
};

TodosFront.prototype.getDropAreaList = function(dropAreaId) {
	return document.querySelector(`#${dropAreaId}`).children;
};

TodosFront.prototype.getDropAreaId = function(event) {
	return event.target.parentNode.id;
};

TodosFront.prototype.getElementMiddleY = function(element) {
	const elementLocation = element.getBoundingClientRect();
	return (elementLocation.top + elementLocation.bottom) / 2;
};

TodosFront.prototype.getAppendTargetIndex = function(dropAreaList, cursorYLocation) {
	const appendTargetIndex = Array.from(dropAreaList).findIndex(element => {
		const elementMiddleY = this.getElementMiddleY(element);
		return elementMiddleY >= cursorYLocation;
	});
	return appendTargetIndex;
};

const todos = new TodosFront();
todos.load();
