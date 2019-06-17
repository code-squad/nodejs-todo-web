class TodoApp {
    constructor() {

    }

    addCardEvent() {
        const addBtnElemnets = document.getElementsByClassName("add-card-anchor");
        for (let addBtnElement of addBtnElemnets) {
            addBtnElement.addEventListener('click', event => {
                const parentElement = event.target.parentNode;
                const divElement = this.createAddForm(parentElement); 
                parentElement.appendChild(divElement);
                event.target.style.display = 'none';
            });
        }
    }
    
    createAddForm(parentElement) {
        const wrapperDivEl = document.createElement('div'); 
        wrapperDivEl.setAttribute('class', 'add-form-box');

        const textareaEl = document.createElement('textarea');
        textareaEl.setAttribute('placeholder', 'Enter a title for this card...');
        textareaEl.setAttribute('autofocus', true);
        wrapperDivEl.appendChild(textareaEl);

        const btnDivEl = document.createElement('div');
        btnDivEl.setAttribute('class', 'add-form-btns');
        
        const addBtnEl = document.createElement('button');
        addBtnEl.setAttribute('class', 'add-btn');
        addBtnEl.innerHTML = "Add Card";
        addBtnEl.addEventListener('click', () => this.addEvent(textareaEl.value, parentElement));

        const cancelBtnEl = document.createElement('button');
        cancelBtnEl.setAttribute('class', 'cancel-btn');
        cancelBtnEl.innerHTML = "Cancel";
        cancelBtnEl.addEventListener('click', event => this.cancelEvent(event));

        btnDivEl.appendChild(addBtnEl);
        btnDivEl.appendChild(cancelBtnEl);
        wrapperDivEl.appendChild(btnDivEl);

        return wrapperDivEl;
    }

    addEvent(text, parentElement) {
        const ulElement = parentElement.querySelector('ul');
        const liElement = document.createElement('li');
        liElement.innerHTML = text;
        ulElement.appendChild(liElement);

        const textareaEl = parentElement.querySelector('textarea');
        textareaEl.value = '';
    }

    cancelEvent(event) {
        console.log(event.target.parentNode);
    }

}
// card 삭제 : 카드 안에 삭제 버튼 이벤트
// card 수정 : 카드 안에 수정 버튼 이벤트 
// card 추가 : 칼럼 푸터에 add 클릭 이벤트
// card 이동 : 드래그 앤 드롭 이벤트

window.onload = function() {
    const todoApp = new TodoApp();
    todoApp.addCardEvent();
}



