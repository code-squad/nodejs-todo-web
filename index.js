const createEvent = function() {
  const addButton = document.getElementsByClassName("add-card-btn")[0];
  addButton.addEventListener("click", function(event) {
    showDiv();
  });
};

const showDiv = function() {
  const target = document.getElementById("todo-input-text");
  target.style.display = "block";
  target.focus();
};

createEvent();
