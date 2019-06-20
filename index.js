let draggingTarget = null;

const createNewCard = function(input) {
  const newCard = document.createElement("div");
  const cardText = document.createTextNode(input);
  newCard.setAttribute("class", "todo-card");
  newCard.setAttribute("draggable", true);
  newCard.appendChild(cardText);
  addDragEvent(newCard);
  return newCard;
};

const addNewCard = function() {
  const inputText = document.querySelector("#todo-input-text");
  const todoList = document.querySelector(".todo-list");
  const todoBoard = todoList.querySelector(".board");
  const newCard = createNewCard(inputText.value);
  todoBoard.appendChild(newCard);
  inputText.value = "";
  hideDiv();
};

const createEvent = function() {
  const addButton = document.querySelector("#add-input-btn");
  addButton.addEventListener("click", function(event) {
    showDiv();
  });

  const inputText = document.querySelector("#todo-input-text");
  createEnterKeyEvent(inputText, addNewCard);
};

const createEnterKeyEvent = function(inputText, eventHandler) {
  inputText.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
      eventHandler(event);
    }
  });
};

const showDiv = function() {
  const target = document.querySelector("#todo-input-text");
  target.style.display = "block";
  target.focus();
};

const hideDiv = function() {
  const target = document.querySelector("#todo-input-text");
  target.style.display = "none";
};

const addDragEvent = function(card) {
  card.addEventListener("dragstart", function(event) {
    draggingTarget = event.target;
    event.dataTransfer.setData("text/html", draggingTarget);
  });

  card.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  card.addEventListener("dragenter", function(event) {
    if (!event.target.nextElementSibling) {
      event.target.style["border-bottom"] = "solid 7px darkblue";
    } else {
      event.target.style["border-top"] = "solid 7px darkblue";
    }
  });

  card.addEventListener("dragleave", function(event) {
    event.target.style["border-bottom"] = "";
    event.target.style["border-top"] = "";
  });

  card.addEventListener("drop", function(event) {
    event.target.style["border-top"] = "";
    event.target.style["border-bottom"] = "";
    if (!event.target.nextElementSibling) {
      event.target.parentNode.appendChild(draggingTarget);
    } else {
      event.target.parentNode.insertBefore(draggingTarget, event.target);
    }
  });
};

createEvent();
