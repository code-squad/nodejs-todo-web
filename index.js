const createNewCard = function(input) {
  const newCard = document.createElement("div");
  const cardText = document.createTextNode(input);
  newCard.appendChild(cardText);
  return newCard;
};

const addNewCard = function() {
  const inputText = document.getElementById("todo-input-text");
  const todoList = document.querySelector(".todo-board");
  const newCard = createNewCard(inputText.value);
  newCard.setAttribute("class", "todo-card");
  todoList.appendChild(newCard);
  inputText.value = "";
};

const createEvent = function() {
  const addButton = document.getElementsByClassName("add-card-btn")[0];
  addButton.addEventListener("click", function(event) {
    showDiv();
  });
  const inputText = document.getElementById("todo-input-text");
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
  const target = document.getElementById("todo-input-text");
  target.style.display = "block";
  target.focus();
};

createEvent();
