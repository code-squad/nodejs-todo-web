function TodosFront() {
	this.dragData = null;
	this.userId = null;
}

TodosFront.prototype.load = function() {
	window.addEventListener('load', async () => {
		const addTodo = document.querySelector('#addTodo');
		const addButton = document.querySelector('#addButton');
		const todos = document.querySelectorAll('.todos');
		const trashCan = document.querySelectorAll('.trash-can');

		await this.setAuthButton();
		await this.getTodosList();

		addTodo.addEventListener('click', event => {
			this.warning();
		});

		addTodo.addEventListener('keyup', event => {
			if (event.keyCode === 13) {
				this.addTodo();
			}
		});

		addButton.addEventListener('click', event => {
			this.addTodo();
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

		trashCan.forEach(element => {
			element.addEventListener('dragover', event => {
				this.allowDrop(event);
			});
		});

		trashCan.forEach(element => {
			element.addEventListener('drop', event => {
				this.deleteElement();
			});
		});
	});
};

TodosFront.prototype.getTodosList = async function() {
	try {
		const response = await fetch(`/todos/${this.userId}`, { method: 'GET' });
		if (response.ok) {
			const todosList = await response.text();
			if (todosList) {
				this.setTodosList(JSON.parse(todosList));
			}
		} else {
			throw new Error('500');
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

TodosFront.prototype.setTodosList = function(todosList) {
	todosList.forEach(todos => {
		this.makeTodos(todos);
	});
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
		location.href = '/auth';
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
		location.href = '/users';
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
		this.logout();
	});

	return logoutButton;
};

TodosFront.prototype.logout = async function() {
	try {
		const response = await fetch('/users', { method: 'DELETE' });
		if (response.redirected) {
			return (location.href = response.url);
		}
		if (response.ok) {
			this.userId = null;
			location.href = '/';
		} else {
			throw new Error('500');
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
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
		const response = await fetch('/permission');
		if (response.ok) {
			const userId = await response.text();
			if (userId === 'false') {
				return false;
			}
			this.userId = userId;
			return true;
		} else {
			throw new Error('500');
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

TodosFront.prototype.drag = async function(event) {
	this.dragData = event.target;
};

TodosFront.prototype.drop = function(event) {
	const dropAreaClassName = event.target.className.split(' ')[0];
	if (dropAreaClassName === 'list') {
		return this.dropListArea(event);
	}
	this.dropTodosArea(event, dropAreaClassName);
};

TodosFront.prototype.allowDrop = function(event) {
	event.preventDefault();
};

TodosFront.prototype.addTodo = async function() {
	this.warning();

	const addTodo = document.querySelector('#addTodo').value;
	if (!addTodo) {
		return;
	}
	const todos_status = 'todo';
	const addTodoData = { user_id: this.userId, todos_status, todos_contents: addTodo };
	try {
		const response = await fetch('/todo', { method: 'POST', body: JSON.stringify(addTodoData) });
		if (response.ok) {
			let addedTodo = await response.text();
			if (addedTodo) {
				addedTodo = JSON.parse(addedTodo)[0];
				this.makeTodos(addedTodo);
				document.querySelector('#addTodo').value = '';
			}
		} else {
			throw new Error('500');
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
};

TodosFront.prototype.makeTodos = function(todosData) {
	const { todos_id, todos_status, todos_contents } = todosData;
	const todos = document.querySelector(`#${todos_status}`);
	const todosArticle = document.createElement('article');
	const todoContents = document.createTextNode(todos_contents);

	todosArticle.appendChild(todoContents);
	todosArticle.className = 'list';
	todosArticle.setAttribute('draggable', 'true');
	todosArticle.setAttribute('id', `${todos_id}`);
	todosArticle.addEventListener('dragstart', event => {
		this.drag(event);
	});
	todos.appendChild(todosArticle);
};

TodosFront.prototype.deleteElement = async function() {
	event.stopPropagation();

	const todos_id = this.dragData.id;
	try {
		const response = await fetch(`/todos/${this.userId}/${todos_id}`, { method: 'DELETE' });
		if (response.ok) {
			this.dragData.remove();
			this.dragData = null;
		} else {
			throw new Error('500');
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
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
	this.sortingTodosList(appendElement, -1);
	document.querySelector(`#${appendElement}`).appendChild(this.dragData);
};

TodosFront.prototype.dropBetweenElements = function(event, dropAreaId) {
	const cursorYLocation = event.clientY;
	const dropAreaList = this.getDropAreaList(dropAreaId);

	const appendTargetIndex = this.getAppendTargetIndex(dropAreaList, cursorYLocation);
	if (appendTargetIndex === -1) {
		return this.dropEndElement(dropAreaId);
	}
	this.sortingTodosList(dropAreaId, dropAreaList[appendTargetIndex].id);
	document.querySelector(`#${dropAreaId}`).insertBefore(this.dragData, dropAreaList[appendTargetIndex]);
};

TodosFront.prototype.sortingTodosList = async function(dropAreaId, targetElementId) {
	const updateTodosData = { updateStatus: dropAreaId, targetElementId, dragElementId: this.dragData.id };

	try {
		const response = await fetch(`/events/${this.userId}`, {
			method: 'PUT',
			body: JSON.stringify(updateTodosData)
		});
		if (!response.ok) {
			throw new Error('500');
		}
	} catch (error) {
		console.log('error.....', error);
		location.href = '/error-500';
	}
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
