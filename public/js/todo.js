let draggingTarget;

const signOutButton = document.getElementById("sign-out-btn");

signOutButton.addEventListener("click", function(event) {
  const signOut = () => {
    const option = {
      method: "POST",
      redirect: "follow",
      headers: new Headers({
        "Content-Type": "text/plain"
      })
    };
    return fetch("/sign-out", option).then(response => {
      if (response.redirected) {
        window.location.href = "/";
      }
    });
  };
  signOut();
});

const listExistingCards = async function() {
  const todoList = document.querySelector("#todo");
  const doingList = document.querySelector("#doing");
  const doneList = document.querySelector("#done");
  const response = await fetchData("/api/get-classified-cards");
  const cards = await response.json();
  const { todoCards, doingCards, doneCards } = cards;

  listCards(todoCards, todoList);
  listCards(doingCards, doingList);
  listCards(doneCards, doneList);
};

const listCards = function(cards, targetList) {
  cards.forEach(card => {
    const { id, title, status } = card;
    const existingCard = createNewCard(id, title, status);
    targetList.appendChild(existingCard);
  });
};

const fetchData = function(url, data) {
  const option = {
    method: "POST",
    body: data,
    redirect: "follow",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };
  return fetch(url, option);
};

const createNewCard = function(id, title, status) {
  const newCard = document.createElement("div");
  const cardText = document.createElement("div");
  const deleteButton = document.createElement("button");
  const editText = document.createElement("input");
  const editButton = document.createElement("button");

  newCard.setAttribute("class", "todo-card");
  newCard.setAttribute("draggable", true);
  cardText.setAttribute("class", "card-text");
  cardText.id = id;
  cardText.innerText = title;
  cardText.className = status;
  deleteButton.innerText = "Delete";
  deleteButton.setAttribute("class", "delete-card-btn");
  editText.setAttribute("value", title);
  editText.setAttribute("id", "edit-text");
  editText.setAttribute("type", "text");
  editButton.innerText = "Edit";
  editButton.setAttribute("class", "edit-card-btn");

  newCard.appendChild(cardText);
  newCard.appendChild(deleteButton);
  newCard.appendChild(editText);
  newCard.appendChild(editButton);

  deleteButton.addEventListener("click", function(event) {
    deleteCard(event);
  });
  editButton.addEventListener("click", function(event) {
    showEditInputBox(event);
  });
  createEnterKeyEvent(editText, editCard);
  return newCard;
};

const addNewCard = async function() {
  const todoList = document.querySelector("#todo");
  const inputText = document.querySelector("#todo-input-text");
  if (!inputText.value) return hideInputTextBox();
  const response = await fetchData(
    "/api/add-new-card",
    `title=${inputText.value}&status=todo`
  );
  const todoCards = await response.json();
  const { id, title, status } = todoCards;
  const newCard = createNewCard(id, title, status);
  todoList.appendChild(newCard);
  inputText.value = "";
  hideInputTextBox();
};

const deleteCard = async function(event) {
  const targetCard = event.target.parentNode;
  const targetList = targetCard.parentNode;
  const cardId = targetCard.querySelector("div").id;
  const response = await fetchData("/api/delete-card", `cardId=${cardId}`);
  const deleteResult = await response.text();

  if (deleteResult === "success") {
    targetList.removeChild(targetCard);
  }
};

const editCard = async function(event) {
  const targetCard = event.target.parentNode;
  const cardText = targetCard.querySelector("div");
  const editTextBox = event.target;
  const cardId = targetCard.querySelector("div").id;
  if (!editTextBox.value) {
    editTextBox.value = cardText.innerText;
    return hideEditInputBox(event);
  }
  const response = await fetchData(
    "/api/edit-card",
    `cardId=${cardId}&newTitle=${editTextBox.value}`
  );
  const editResult = await response.text();
  if (editResult === "success") {
    cardText.innerText = editTextBox.value;
    hideEditInputBox(event);
  }
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
  const lists = document.querySelectorAll(".list");
  lists.forEach(list => {
    addDragEvent(list);
  });

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
    if (event.target.className === "todo-card") {
      event.target.style["border-top"] = "solid 70px rgb(161, 193, 253)";
    }
  });

  card.addEventListener("dragleave", function(event) {
    event.target.style["border-bottom"] = "";
    event.target.style["border-top"] = "";
  });

  card.addEventListener("drop", async function(event) {
    event.target.style["border-top"] = "";
    event.target.style["border-bottom"] = "";
    if (event.target.className === "list") {
      const targetBoard = event.target.querySelector(".board");
      const dragTargetCardId = draggingTarget.querySelector("div").id;
      const newStatus = targetBoard.id;
      const response = await fetchData(
        "/api/update-status",
        `dragTargetCardId=${dragTargetCardId}&newStatus=${newStatus}`
      );
      const updatestatusResult = await response.text();
      if (updatestatusResult === "success") {
        draggingTarget.querySelector("div").className = newStatus;
        targetBoard.appendChild(draggingTarget);
      }
    }

    if (event.target.className === "add-card-btn") {
      const targetBoard = event.target.parentNode.querySelector(".board");
      const dragTargetCardId = draggingTarget.querySelector("div").id;
      const newStatus = targetBoard.id;
      const response = await fetchData(
        "/api/update-status",
        `dragTargetCardId=${dragTargetCardId}&newStatus=${newStatus}`
      );
      const updatestatusResult = await response.text();
      if (updatestatusResult === "success") {
        draggingTarget.querySelector("div").className = newStatus;
        targetBoard.appendChild(draggingTarget);
      }
    }

    if (event.target.className === "todo-card") {
      const dragTargetCardId = draggingTarget.querySelector("div").id;
      const newStatus = event.target.querySelector("div").className;
      const dropTargetCardId = event.target.querySelector("div").id;
      const response = await fetchData(
        "/api/update-status",
        `dragTargetCardId=${dragTargetCardId}&newStatus=${newStatus}&dropTargetCardId=${dropTargetCardId}`
      );
      const updatestatusResult = await response.text();
      if (updatestatusResult === "success") {
        draggingTarget.querySelector("div").className = newStatus;
        event.target.parentNode.insertBefore(draggingTarget, event.target);
      }
    }
  });
};

createEvent();
listExistingCards();
