const TodoBoardEvent = class {
  constructor() {
    this.dragData = null;
  }

  createElement(elName, classNameArr, attObj, innerHtml) {
    const element = document.createElement(elName);
    if (Array.isArray(classNameArr)) {
      classNameArr.forEach(name => {
        element.classList.add(name);
      })
    }

    Object.keys(attObj).forEach((key) => {
      element.setAttribute(key, attObj[key]);
    })

    if (innerHtml !== null) {
      element.innerHTML = innerHtml;
    }
    return element;
  }

  ajax() {
    
    const submitCardAjax = async (content, type) => {
      const url = '/todo';
      const response = await fetch(url, {
        method : 'POST',
        body : `data=${content}&type=${type}`
      });
      const ajaxText = await response.text(); 
      return ajaxText;
    }

    const removeCardAjax = () => {
    }

    const dragCardAjax = () => {

    }

    return {
      submitCardAjax,
      removeCardAjax,
      dragCardAjax,
    }
  }

  async submitCardEvent(event, addInputBoxBtn) {
    const submitBtn = event.target;
    const board = submitBtn.parentElement.parentElement;
    const cardType = board.className.split(' ')[1];
    const cardTitle = $('.card-title-input', submitBtn.parentElement)[0].value;

    if (cardTitle === '') {
      alert('내용을 입력해주세요');
      return;
    }

    const cardNo = await this.ajax().submitCardAjax(cardTitle, cardType);

    const exitImgContent = `<img src="img/exit.png" alt="exit-image" class="card-image-exit">`;
    const cardSectionElement = this.createElement('section', ['card', 'todo'], {
      'draggable': 'true', 'data-no' : `${cardNo}`
    }, exitImgContent + cardTitle);

    const cardWrapper = $('.card-wrapper', board)[0];
    const exitBtns = $('.card-image-exit', cardSectionElement)[0];

    exitBtns.addEventListener('click', (event) => {
      this.deleteCardEvent(event);
    })

    cardWrapper.appendChild(cardSectionElement);
    this.addDragStartEvent(cardSectionElement);

    board.appendChild(addInputBoxBtn);
    board.removeChild(event.target.parentElement);
  }

  cancelCardEvent(event, addInputBoxBtn) {
    const board = event.target.parentElement.parentElement;
    board.appendChild(addInputBoxBtn);
    board.removeChild(event.target.parentElement);
  }

  addCancelCardEvent(addInputBoxBtn, btn) {
    btn.addEventListener('click', (event) => {
      this.cancelCardEvent(event, addInputBoxBtn);
    })
  }

  addSubmitCardEvent(addInputBoxBtn, btn) {
    btn.addEventListener('click', (event) => {
      this.submitCardEvent(event, addInputBoxBtn);
    })
  }

  makeInputEvent(event) {
    const inputCreateBtn = event.target;
    const board = inputCreateBtn.parentElement;

    const inputTextArea = this.createElement('textarea', ['card-title-input'], {
      "placeholder": "Enter a title for this card ..."
    }, null);

    const inputCancelBtn = this.createElement('span', ['cancel-card-btn'], {}, "취소");
    const inputSubmitBtn = this.createElement('button', ['submit-card-btn'], {
      "type": "submit"
    }, "ADD CARD");
    const inputSection = this.createElement('section', ['add-card-input-wrapper'], {}, null);

    inputSection.appendChild(inputTextArea);
    inputSection.appendChild(inputCancelBtn);
    inputSection.appendChild(inputSubmitBtn);

    board.appendChild(inputSection);
    board.removeChild(inputCreateBtn);

    const submitCardBtn = $('.submit-card-btn', board)[0];
    const cancelCardBtn = $('.cancel-card-btn', board)[0];

    this.addSubmitCardEvent(inputCreateBtn, submitCardBtn);
    this.addCancelCardEvent(inputCreateBtn, cancelCardBtn);
  }

  addMakeInputEvent(btn) {
    btn.addEventListener('click', (event) => {
      this.makeInputEvent(event);
    })
  }

  deleteCardEvent(event) {
    event.target.parentElement.parentElement.removeChild(event.target.parentElement);
  }

  addCardEvent() {
    Array.from($('.add-card-btn')).forEach((btn) => {
      this.addMakeInputEvent(btn);
    })
  }

  dragStart(event) {
    event.dataTransfer.setDragImage(event.target, 0, 0);
    this.dragData = event.target;
  }

  dragOver(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();
    const todoType = event.target.className.split(" ")[1];
    const wrapper = $(`#card-wrapper-${todoType}`);

    this.dragData.classList.remove(this.dragData.className.split(" ")[1]);
    this.dragData.classList.add(`${todoType}`);

    if (wrapper.children.length === 0) {
      wrapper.appendChild(this.dragData);
      return;
    }

    this.insertCardEvent(event, wrapper);
  }

  addDragStartEvent(element) {
    element.addEventListener('dragstart', (event) => {
      this.dragStart(event);
    })
  }

  addEventForExistCard() {
    const boardElements = $('.board');

    Array.from(boardElements).forEach((board) => {
      board.addEventListener('dragover', (event) => {
        this.dragOver(event);
      });

      board.addEventListener('drop', (event) => {
        this.drop(event);
      });
    })

    const cards = $('.card');
    Array.from(cards).forEach((card) => {
      this.addDragStartEvent(card);
    })

    const existExitBtns = $('.card .card-image-exit');
    Array.from(existExitBtns).forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this.deleteCardEvent(event);
      })
    })
  }

  getMiddleY(element) {
    const locationObj = element.getBoundingClientRect();
    const middleValue = (locationObj.top + locationObj.bottom) / 2;
    return middleValue;
  }

  insertCardEvent(event, wrapper) {
    const firstCardMiddle = this.getMiddleY(wrapper.children[0]);
    const lastCardMiddle = this.getMiddleY(wrapper.children[wrapper.children.length - 1]);

    if (event.clientY <= firstCardMiddle) {
      wrapper.insertBefore(this.dragData, wrapper.firstChild);
      return;
    }

    if (event.clientY >= lastCardMiddle) {
      wrapper.appendChild(this.dragData);
      return;
    }

    for (let i = 0; i < wrapper.children.length - 1; i++) {
      const beforeMiddle = this.getMiddleY(wrapper.children[i]);
      const nextMiddle = this.getMiddleY(wrapper.children[i + 1]);

      if (event.clientY >= beforeMiddle && event.clientY <= nextMiddle) {
        wrapper.insertBefore(this.dragData, wrapper.children[i + 1]);
        return;
      }
    }
  }

  run() {
    this.addCardEvent();
    this.addEventForExistCard();
  }
}

window.addEventListener('load', () => {
  const todoBoardEvent = new TodoBoardEvent();
  todoBoardEvent.run();
})