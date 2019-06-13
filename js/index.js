const Index = class {
  constructor() {

  }

  createElement(elName, classNameArr, attObj, innerHtml) {
    const element = document.createElement(elName);
    if (classNameArr !== null) {
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

    const cardContent = `<p>${cardTitle}</p>`
    const cardSectionElement = this.createElement('section', ['card', 'todo'], { 'draggable': 'true' }, cardContent);

    const cardWrapper = board.getElementsByClassName('card-wrapper')[0];

    cardWrapper.appendChild(cardSectionElement);

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
  

}