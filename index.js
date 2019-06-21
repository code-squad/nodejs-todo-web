let draggingTarget = null;

const createNewCard = function(input) {
  const newCard = document.createElement("div");
  const cardText = document.createTextNode(input);
  const deleteButton = document.createElement("button");
  newCard.setAttribute("class", "todo-card");
  newCard.setAttribute("draggable", true);
  deleteButton.innerText = "Delete";
  deleteButton.setAttribute("class", "delete-card-btn");

  newCard.appendChild(cardText);
  newCard.appendChild(deleteButton);

  addDragEvent(newCard);
  deleteButton.addEventListener("click", function(event) {
    deleteCard(event);
  });
  return newCard;
};

const addNewCard = function() {
  const inputText = document.querySelector("#todo-input-text");
  if (!inputText.value) return hideInputTextBox();
  const todoList = document.querySelector(".todo-list");
  const todoBoard = todoList.querySelector(".board");
  const newCard = createNewCard(inputText.value);
  todoBoard.appendChild(newCard);
  inputText.value = "";
  hideInputTextBox();
};

const deleteCard = function(event) {
  const targetCard = event.target.parentNode;
  const targetList = targetCard.parentNode;
  targetList.removeChild(targetCard);
};

const createEvent = function() {
  const todoDefaultCard = document.querySelector("#todo-default-card");
  const doingDefaultCard = document.querySelector("#doing-default-card");
  const doneDefaultCard = document.querySelector("#done-default-card");

  addDragEvent(todoDefaultCard);
  addDragEvent(doingDefaultCard);
  addDragEvent(doneDefaultCard);

  const addButton = document.querySelector("#add-input-btn");
  addButton.addEventListener("click", function(event) {
    showInputTextBox();
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

const showInputTextBox = function() {
  const target = document.querySelector("#todo-input-text");
  target.style.display = "block";
  target.focus();
};

const hideInputTextBox = function() {
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
