class TodoApp {
    constructor() {
        this.dragTarget = null;
        this.xhr = new XMLHttpRequest();
    }

    setClickAddEvent() { // 칼럼 하단부 이벤트 달기
        const addBtnElemnets = document.getElementsByClassName("add-link");
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
        textareaEl.setAttribute('placeholder', 'Enter a title for this card...');
        divEl.appendChild(textareaEl);

        const btnDivEl = document.createElement('div');
        btnDivEl.setAttribute('class', 'add-form-btns');
        btnDivEl.setAttribute('id', columnType + '-btn-div');
        
        const addBtnEl = document.createElement('button');
        addBtnEl.setAttribute('class', 'add-btn');
        addBtnEl.setAttribute('id', columnType + '-add-btn');
        addBtnEl.innerHTML = "Add Card";
        addBtnEl.addEventListener('click', () => this.addCard(textareaEl.value, parentElement));

        const cancelBtnEl = document.createElement('button');
        cancelBtnEl.setAttribute('class', 'cancel-btn');
        cancelBtnEl.setAttribute('id', columnType + '-cancel-btn');
        cancelBtnEl.innerHTML = "Cancel";
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
        liElement.setAttribute('class', 'card-li');
        liElement.setAttribute('draggable', 'true');
        liElement.innerHTML = 
            `<input class="card-input" id="${columntype}-input" readonly name="" value="${cardText}">
            <input class="update-btn" id="${columntype}-update" type="button" value="U">
            <input class="delete-btn" id="${columntype}-delete" type="button" value="X">`;
        ulElement.appendChild(liElement);

        // textarea 초기화, 포커싱
        const textareaElement = parentElement.querySelector('textarea');
        textareaElement.value = '';
        textareaElement.focus(); 
        
        // card와 버튼에 이벤트 추가
        liElement.addEventListener('dragstart', event => this.dragStartEvent(event));
        liElement.addEventListener('mouseenter', event => this.handleBtnVisible(event));
        liElement.addEventListener('mouseleave', event => this.handleBtnVisible(event));
        const updateBtn = liElement.querySelector('.update-btn');
        updateBtn.addEventListener('click', event => this.updateCardEvent(event));
        const deleteBtn = liElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', event => this.deleteCardEvent(event));

        // 서버에 데이터 전송
        //this.xhr.onreadystatechange();
        this.xhr.open("POST", "/cards", true);
        this.xhr.setRequestHeader('Content-Type', 'application/json');
        const card = {columnType: columntype, text: cardText};
        this.xhr.send(JSON.stringify(card));
    }

    handleBtnVisible(event) {
        let attribute;
        if (event.type === 'mouseenter') attribute = 'visible';
        if (event.type === 'mouseleave') attribute = 'hidden';
        for (let child of event.target.childNodes) 
            if (child.type === 'button') child.style.visibility = attribute;
    }


    dragStartEvent(event) { this.dragTarget = event.target; } // drag 객체를 저장

    deleteCardEvent(event) { // card 삭제
        const targetElement = event.target.parentElement;
        targetElement.remove();
    }
    
    updateCardEvent(event) { // card 수정 
        const targetElement = event.target.previousSibling.previousSibling;
        targetElement.removeAttribute('readonly');
        targetElement.select();
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
        const ulElement = document.getElementById(columnType + '-list');
        const liList = ulElement.childNodes; 
        const eventYPos = event.clientY;

        if (liList.length === 0) {
            ulElement.appendChild(this.dragTarget)
        } else if (eventYPos <= liList[0].getBoundingClientRect().y) {
            ulElement.insertBefore(this.dragTarget, ulElement.firstChild);
        } else if (eventYPos >=  liList[liList.length-1].getBoundingClientRect().y) {
            ulElement.appendChild(this.dragTarget);
        } else {
            for (let i = 0; i < liList.length; i++) {
                if (eventYPos >= liList[i].getBoundingClientRect().y && eventYPos <= liList[i+1].getBoundingClientRect().y) {
                    ulElement.insertBefore(this.dragTarget, ulElement.children[i+1]);
                    break;
                }
            }
        }
    }
}

window.onload = function() {
    const todoApp = new TodoApp();
    todoApp.setClickAddEvent();
    todoApp.setDropEvent();
};

// 브라우저에서 서버쪽으로 데이터 보내야할 경우
// add-form에서 add버튼 누를 때 
// card에서 수정할 때
// card에서 삭제 누를 때
// drop될 때 

