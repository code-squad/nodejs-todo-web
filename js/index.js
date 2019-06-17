const Index = class {
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

  submitCardEvent(event, addInputBoxBtn) {
    const submitBtn = event.target;
    const board = submitBtn.parentElement.parentElement;

    const cardTitle = submitBtn.parentElement.getElementsByClassName('card-title-input')[0].value;

    if (cardTitle === '') {
      alert('내용을 입력해주세요');
      return;
    }

    const exitImgContent = `<img src="img/exit.png" alt="exit-image" class="card-image-exit">`;
    const cardSectionElement = this.createElement('section', ['card', 'todo'], {
      'draggable': 'true'
    }, exitImgContent + cardTitle);

    const cardWrapper = board.getElementsByClassName('card-wrapper')[0];


    const exitBtns = cardSectionElement.getElementsByClassName('card-image-exit')[0];
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

    const submitCardBtns = board.getElementsByClassName('submit-card-btn');
    const cancelCardBtns = board.getElementsByClassName('cancel-card-btn');

    Array.from(submitCardBtns).forEach((submitCardBtn) => {
      this.addSubmitCardEvent(inputCreateBtn, submitCardBtn);
    })

    Array.from(cancelCardBtns).forEach((cancelCardBtn) => {
      this.addCancelCardEvent(inputCreateBtn, cancelCardBtn);
    })
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
    const addCardButtons = document.getElementsByClassName('add-card-btn');
    Array.from(addCardButtons).forEach((btn) => {
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
    const wrapper = document.getElementById(`card-wrapper-${todoType}`);

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

  addDragEvent() {
    const boardElements = document.getElementsByClassName('board');

    Array.from(boardElements).forEach((board) => {
      board.addEventListener('dragover', (event) => {
        this.dragOver(event);
      })
    })

    Array.from(boardElements).forEach((board) => {
      board.addEventListener('drop', (event) => {
        this.drop(event);
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
    this.addDragEvent();
  }
}

window.addEventListener('load', () => {
  const index = new Index();
  index.run();
})