class TodoApp {
	constructor() {
		this.dragTarget = null;
		this.dragInfo = {
			prevColumn: null,
			prevIndex: null,
			nextColumn: null,
			nextIndex: null,
		}
	}

	setClickAddEvent() { // 칼럼 하단부 이벤트 달기
		const addBtnElemnets = document.getElementsByClassName('add-link');
		for (let addBtnElement of addBtnElemnets) {
			addBtnElement.addEventListener('click', event => {
				const parentElement = event.target.parentNode;
				const columnType = event.target.id.split('-')[0];
				parentElement.appendChild(this.createAddForm(parentElement, columnType));
				event.target.style.display = 'none';
			});
		}
	}

	createAddForm(parentElement, columnType) { // 할일 추가하는 폼 생성하고 이벤트 달기
		const divEl = document.createElement('div');
		divEl.setAttribute('class', 'add-form-box');
		divEl.setAttribute('id', columnType + '-form-box');

		const textareaEl = document.createElement('textarea');
		textareaEl.setAttribute('class', 'add-form-textarea');
		textareaEl.setAttribute('id', columnType + '-textarea');
		divEl.appendChild(textareaEl);

		const btnDivEl = document.createElement('div');
		btnDivEl.setAttribute('class', 'add-form-btns');
		btnDivEl.setAttribute('id', columnType + '-btn-div');

		const addBtnEl = document.createElement('button');
		addBtnEl.setAttribute('class', 'add-btn');
		addBtnEl.setAttribute('id', columnType + '-add-btn');
		addBtnEl.innerHTML = 'Add Card';
		addBtnEl.addEventListener('click', () => this.addCard(textareaEl.value, parentElement));

		const cancelBtnEl = document.createElement('button');
		cancelBtnEl.setAttribute('class', 'cancel-btn');
		cancelBtnEl.setAttribute('id', columnType + '-cancel-btn');
		cancelBtnEl.innerHTML = 'Cancel';
		cancelBtnEl.addEventListener('click', () => this.deleteAddForm(parentElement));
		btnDivEl.appendChild(addBtnEl);
		btnDivEl.appendChild(cancelBtnEl);

		divEl.appendChild(btnDivEl);
		setTimeout(() => document.getElementById(columnType + '-textarea').focus());
		return divEl;
	}

	deleteAddForm(parentElement) { // form 삭제하고 add a card 다시 보이게
		const formBoxElement = parentElement.querySelector('.add-form-box');
		parentElement.removeChild(formBoxElement);
		const addLink = parentElement.querySelector('.add-link');
		addLink.style.display = 'block';
	}

	addCard(cardText, parentElement) { // card가 추가될 때 이벤트
		// card 추가
		const ulElement = parentElement.querySelector('ul');
		const liElement = document.createElement('li');
		const columntype = ulElement.id.split('-')[0];
		liElement.setAttribute('id', `${columntype}-li`);
		liElement.setAttribute('class', 'card-li');
		liElement.setAttribute('draggable', 'true');
		liElement.innerHTML = `<input class="card-input" id="${columntype}-input" readonly name="" value="${cardText}">
							   <input class="delete-btn" id="${columntype}-delete" type="button" value="X">`;
		ulElement.appendChild(liElement);

		// card와 버튼에 이벤트 추가
		liElement.addEventListener('dragstart', event => this.dragStartEvent(event));
		liElement.addEventListener('mouseenter', event => this.handleBtnVisible(event));
		liElement.addEventListener('mouseleave', event => this.handleBtnVisible(event));
		const deleteBtn = liElement.querySelector('.delete-btn');
		deleteBtn.addEventListener('click', event => this.deleteCardEvent(event));

		// textarea 초기화, 포커싱 & 서버로 card 데이터 전송
		const textareaElement = parentElement.querySelector('textarea');
		if (textareaElement !== null) {
			textareaElement.value = '';
			textareaElement.focus();
			
			const card = {};
			card.columnType = `${columntype}-column`;
			card.text = cardText;
			fetch('/card', {
				headers: {'Content-Type': 'application/json'}, 
				method: 'POST',
				body: JSON.stringify(card)
			}).then(res => {
				if (res.ok)	console.log('card 추가');
			}).catch(err => console.error(err));
		}
	}

	handleBtnVisible(event) {
		let attribute;
		if (event.type === 'mouseenter') attribute = 'visible';
		if (event.type === 'mouseleave') attribute = 'hidden';
		for (let child of event.target.childNodes) 
			if (child.type === 'button') child.style.visibility = attribute;
	}

	dragStartEvent(event) { 
		this.dragTarget = event.target;
		const columnType = this.dragTarget.parentElement.id;
		const ulElement = this.dragTarget.parentElement;
		const children = ulElement.children;	
		let index;	
		for (let i = 0; i < children.length; i++) {
			if (children.item(i) === this.dragTarget) {
				index = i;
				break;
			}
		}
		this.dragInfo.prevColumn = columnType;
		this.dragInfo.prevIndex = index;
	}

	deleteCardEvent(event) { // card 삭제
		const li = event.target.parentElement;
		const ul = li.parentElement;
		const children = ul.children;
		
		let index;
		for (let i = 0; i < children.length; i++) {
			if (children.item(i) === li) {
				index = i;
				break;
			}
		}
			
		const columnType = ul.id;
		const deletedCard = {columnType: columnType, index: index};	
		li.remove();

		fetch('/card', {
			headers: {'Content-Type': 'application/json'}, 
			method: 'DELETE',
			body: JSON.stringify(deletedCard)
		}).then(res => {
			if (res.ok)	console.log('card 삭제');
		}).catch(err => console.error(err));
	}

	setDropEvent() { // 칼럼에 이벤트 달기
		const columnBoxElements = document.getElementsByClassName('column-box');
		for (let columnBoxElement of columnBoxElements) {
			columnBoxElement.addEventListener('dragover', event => event.preventDefault());
			columnBoxElement.addEventListener('drop', event => this.dorpCardEvent(event));
		}
	}

	dorpCardEvent(event) {
		event.preventDefault();
		const columnType = event.target.id.split('-')[0];
		this.dragInfo.nextColumn = columnType + '-list';
		const ulElement = document.getElementById(columnType + '-list');
		const liList = ulElement.childNodes;
		const eventYPos = event.clientY;

		if (liList.length === 0) {
			ulElement.appendChild(this.dragTarget);
			this.dragInfo.nextIndex = 0;
		} else if (eventYPos <= liList[0].getBoundingClientRect().y) {
			ulElement.insertBefore(this.dragTarget, ulElement.firstChild);
			this.dragInfo.nextIndex = 0;
		} else if (eventYPos >= liList[liList.length - 1].getBoundingClientRect().y) {
			ulElement.appendChild(this.dragTarget);
			this.dragInfo.nextIndex = liList.length - 1;
		} else {
			for (let i = 0; i < liList.length; i++) {
				if (eventYPos >= liList[i].getBoundingClientRect().y && eventYPos <= liList[i + 1].getBoundingClientRect().y) {
					ulElement.insertBefore(this.dragTarget, ulElement.children[i + 1]);
					this.dragInfo.nextIndex = i + 1;
					break;
				}
			}
		}
		
		console.log(this.dragInfo);
		fetch('/card', {
			headers: {'Content-Type': 'application/json'}, 
			method: 'PATCH',
			body: JSON.stringify(this.dragInfo)
		}).then(res => {
			if (res.ok)	console.log('card 이동');
		}).catch(err => console.error(err));
	}

	appendInitialCards() {
		fetch('/card', {
			headers: {'Content-Type': 'application/json'}, 
            method: 'GET',
		}).then(res => {
			return res.json().then(columns => {
				for (let colName of Object.keys(columns)) {
					const columnType = colName + '-column';
					for (let card of columns[colName]) {
						 let {text} = card;
						 let columnEl = document.getElementById(columnType);
						 this.addCard(text, columnEl);
					}

				}
			}).catch(err => console.error(err));
		})
	}

	setLogout() {
		const button = document.getElementById('btn-logout');
		button.addEventListener('click', () => this.logoutEvent(event));
	}

	async logoutEvent(event) {
		event.preventDefault();
		try {
			const response = await fetch('/logout', { method: 'POST' });
			console.log(document.cookie);
			location.href = response.url;
		} catch (error) {
			console.log(error);
		}
	}

	handelError() {
		response.
	}
}

window.onload = function() {
	const todoApp = new TodoApp();
	todoApp.setClickAddEvent();
	todoApp.setDropEvent();
	todoApp.appendInitialCards();
	todoApp.setLogout();
};

