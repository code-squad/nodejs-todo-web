class TodoApp {
    constructor() {

    }

    addCardEvent() { // 칼럼 하단부에 이벤트 달기
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
    
    createAddForm(parentElement) { // 할일 추가하는 폼 생성하고 이벤트 달기
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
        addBtnEl.addEventListener('click', () => this.addCard(textareaEl.value, parentElement));

        const cancelBtnEl = document.createElement('button');
        cancelBtnEl.setAttribute('class', 'cancel-btn');
        cancelBtnEl.innerHTML = "Cancel";
        cancelBtnEl.addEventListener('click', () => this.deleteAddForm(parentElement));

        btnDivEl.appendChild(addBtnEl);
        btnDivEl.appendChild(cancelBtnEl);
        wrapperDivEl.appendChild(btnDivEl);

        return wrapperDivEl;
    }

    addCard(cardText, parentElement) { // 할일 card 추가 후 버튼에 이벤트 리스너도 여기서 달아줘야 할듯..?
        const ulElement = parentElement.querySelector('ul');
        const cardElement = document.createElement('div');
        cardElement.setAttribute('class', 'card-element');
        cardElement.innerHTML = `
            <input class="card-input" readonly id="" name="" value="${cardText}">
            <input class="update-btn" type="button" value="U">
            <input class="delete-btn" type="button" value="X">`;
            ulElement.appendChild(cardElement);
            const textareaEl = parentElement.querySelector('textarea');
            textareaEl.value = '';
    }

    // addCard(text, parentElement) { // 할일 추가
    //     const ulElement = parentElement.querySelector('ul');
    //     const liElement = document.createElement('li');
    //     liElement.innerHTML = text;
    //     ulElement.appendChild(liElement);

    //     const textareaEl = parentElement.querySelector('textarea');
    //     textareaEl.value = '';
    // }

    deleteAddForm(parentElement) { // form 삭제하고 add another card 다시 보이게
        const formBoxElement = parentElement.querySelector('.add-form-box');
        parentElement.removeChild(formBoxElement);
        const addCardAnchor = parentElement.querySelector('.add-card-anchor');
        addCardAnchor.style.display = 'block';
    }

    deleteCardEvent() {
        const deleteBtns = document.getElementsByClassName('delete-btn');
        console.log(deleteBtns);
    }
}

window.onload = function() {
    const todoApp = new TodoApp();
    todoApp.addCardEvent();
}



