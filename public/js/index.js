let draggingTarget = null;

const createNewCard = function(input) {
  const newCard = document.createElement("div");
  const cardText = document.createElement("div");
  const deleteButton = document.createElement("button");
  const editText = document.createElement("input");
  const editButton = document.createElement("button");

  newCard.setAttribute("class", "todo-card");
  newCard.setAttribute("draggable", true);
  cardText.setAttribute("class", "card-text");
  cardText.innerText = input;
  deleteButton.innerText = "Delete";
  deleteButton.setAttribute("class", "delete-card-btn");
  editText.setAttribute("value", input);
  editText.setAttribute("id", "edit-text");
  editText.setAttribute("type", "text");
  editButton.innerText = "Edit";
  editButton.setAttribute("class", "edit-card-btn");

  newCard.appendChild(cardText);
  newCard.appendChild(deleteButton);
  newCard.appendChild(editText);
  newCard.appendChild(editButton);

  addDragEvent(newCard);

  deleteButton.addEventListener("click", function(event) {
    deleteCard(event);
  });
  editButton.addEventListener("click", function(event) {
    showEditInputBox(event);
  });
  createEnterKeyEvent(editText, editCard);
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

const editCard = function(event) {
  const targetCard = event.target.parentNode;
  const cardText = targetCard.querySelector(".card-text");
  const editTextBox = event.target;
  if (!editTextBox.value) {
    editTextBox.value = cardText.innerText;
    return hideEditInputBox(event);
  }
  cardText.innerText = editTextBox.value;
  hideEditInputBox(event);
};

const showEditInputBox = function(event) {
  const editInputBox = event.target.previousSibling;
  editInputBox.style.display = "block";
  editInputBox.focus();
};

const hideEditInputBox = function(event) {
  event.target.style.display = "none";
};

const createEvent = function() {
  const todoList = document.querySelector(".todo-list");
  const doingList = document.querySelector(".doing-list");
  const doneList = document.querySelector(".done-list");
  addDragEvent(todoList);
  addDragEvent(doingList);
  addDragEvent(doneList);

  const addButton = document.querySelector(".add-card-btn");
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
    if (event.target.className === "board") {
      event.target.style["border-bottom"] = "solid 70px rgb(161, 193, 253)";
    }
    if (event.target.className === "todo-card") {
      event.target.style["border-top"] = "solid 70px rgb(161, 193, 253)";
    }
  });

  card.addEventListener("dragleave", function(event) {
    event.target.style["border-bottom"] = "";
    event.target.style["border-top"] = "";
  });

  card.addEventListener("drop", function(event) {
    event.target.style["border-top"] = "";
    event.target.style["border-bottom"] = "";
    if (event.target.className === "board") {
      event.target.appendChild(draggingTarget);
    }
    if (event.target.className === "todo-card") {
      event.target.parentNode.insertBefore(draggingTarget, event.target);
    }
  });
};

createEvent();
