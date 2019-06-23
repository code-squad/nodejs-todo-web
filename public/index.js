function getTodoListContainer(title) {
  return `<div class="todo-column todolist-container grey lighten-2">
<div class="todolist-header">
  ${title}
</div>
<ul class="collection">
</ul>
<div class="todolist-footer">
  <button class="add-card">Add card</button>
  <div class="add-card-form hide-element">
    <input class="input-field new-card-name" placeholder="Input new card name">
  </div>
</div>
</div>
`;
}

function getTodoItem(value) {
  return `<li class="collection-item todo-item" draggable="true"><div>${value}</div></li>`
}

function fetchData(url = '/todo', data = {}, method = 'POST') {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  })
  .then(response => response);
}

function appendChildInTargetNode(target, htmlText) {
  var parser = new DOMParser();
  var newDOM = parser.parseFromString(htmlText, 'text/html');
  target.appendChild(newDOM.body.firstChild);
}

function appearInputTag(hideElement, formQuery, inputQuery) {
  hideElement.classList.add('hide-element');
  var form = hideElement.parentNode.querySelector(formQuery);
  form.classList.remove('hide-element');
  form.querySelector(inputQuery).focus();
}

function hideInputTag(inputElement, btnQuery) {
  var btn = inputElement.parentNode.parentNode.querySelector(btnQuery);
  btn.classList.remove('hide-element');
  inputElement.parentNode.classList.add('hide-element');
  inputElement.value = "";
}

function onClickListenerOfAddTodoBtn(event) {
  event.preventDefault();
  appearInputTag(this, '.add-card-form', '.new-card-name');
}

function keyDownHandlerOfCardNameInput(event) {
  var key = event.which || event.keyCode;

  if(key === 13){
    if(this.value === '') return;
    var todoColumn = this.parentNode.parentNode.parentNode;
    var header = todoColumn.querySelector('.todolist-header');
    var target = todoColumn.querySelector('.collection');
    var parser = new DOMParser();
    var newDOM = parser.parseFromString(getTodoItem(this.value), 'text/html');
    addDnDHandlersForTodoItem(newDOM.body.firstChild);
    target.appendChild(newDOM.body.firstChild);
    hideInputTag(this, '.add-card');

    var position = target.children.length - 1;

    fetchData(`http://${window.location.host}/todo`, {name: target.children[position].innerText , position, todolist: header.innerText})
    .then(response => console.log('Success:', response === undefined && response === '' ? response : JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  if(key === 27){
    hideInputTag(this, '.add-card');
  }
}

function keyDownHandlerOfTodoNameInput(event) {
  var key = event.which || event.keyCode;

  if(key === 13){
    if(this.value === '') return;
    var target = this.parentNode.parentNode;
    var parser = new DOMParser();
    var todoListName = this.value;
    var newDOM = parser.parseFromString(getTodoListContainer(todoListName), 'text/html');

    var newAddCardBtn = newDOM.querySelector('.add-card');
    var newCardNameInput = newDOM.querySelector('.new-card-name');
    var todoListFooter = newDOM.querySelector('.todolist-footer');

    newAddCardBtn.addEventListener('click', onClickListenerOfAddTodoBtn);
    newCardNameInput.addEventListener('keydown', keyDownHandlerOfCardNameInput);
    addDnDHandlersForTodoListFooter(todoListFooter);

    target.insertAdjacentElement('beforebegin', newDOM.body.firstChild);

    hideInputTag(this, '#add-todo-btn');

    var todoContainer = document.querySelector('.todo-container');
    var position = todoContainer.children.length - 2;

    fetchData(`http://${window.location.host}/todolist`, {name: todoListName , position })
    .then(response => console.log('Success:', response === undefined && response === '' ? response : JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  if(key === 27){
    hideInputTag(this, '#add-todo-btn');
  }
}

function handleDragStart(event) {
  dragSrcEl = this;

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('drag-element');
}

function handleDragOver(event) {
  if (event.preventDefault) {
    event.preventDefault(); 
  }
  this.classList.add('over');

  event.dataTransfer.dropEffect = 'move';  

  return false;
}

function handleDragEnter(event) {
  this.classList.add('over');
}

function handleDragLeave(event) {
  this.classList.remove('over');  
}

function handleDropForTodoItem(event) {
  if (event.stopPropagation) {
    event.stopPropagation(); 
  }

  if (dragSrcEl != this) {
    dragSrcEl.parentNode.removeChild(dragSrcEl);
    var dropHTML = event.dataTransfer.getData('text/html');
    dropHTML = dropHTML.replace(/<\s*meta[^>]*>/, '');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlersForTodoItem(dropElem);
    
  }
  this.classList.remove('over');
  return false;
}

function handleDropForTodolistFooter(event) {
  if (event.stopPropagation) {
    event.stopPropagation(); 
  }

  if (dragSrcEl != this) {
    dragSrcEl.parentNode.removeChild(dragSrcEl);
    var dropHTML = event.dataTransfer.getData('text/html');
    dropHTML = dropHTML.replace(/<\s*meta[^>]*>/, '');
    var target = this.parentNode.querySelector('.collection');
    target.insertAdjacentHTML('beforeend', dropHTML);
    var dropElem = target.lastChild;
    addDnDHandlersForTodoItem(dropElem);
  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  this.classList.remove('over');
  this.classList.remove('drag-element');
}

function addDnDHandlersForTodoItem(todoItem){ 
  todoItem.addEventListener('dragstart', handleDragStart, false);
  todoItem.addEventListener('dragenter', handleDragEnter, false)
  todoItem.addEventListener('dragover', handleDragOver, false);
  todoItem.addEventListener('dragleave', handleDragLeave, false);
  todoItem.addEventListener('drop', handleDropForTodoItem, false);
  todoItem.addEventListener('dragend', handleDragEnd, false);
}

function addDnDHandlersForTodoListFooter(todolistFooter) {
  todolistFooter.addEventListener('dragenter', handleDragEnter, false);
  todolistFooter.addEventListener('dragover', handleDragOver, false);
  todolistFooter.addEventListener('dragleave', handleDragLeave, false);
  todolistFooter.addEventListener('drop', handleDropForTodolistFooter, false);
}

var addTodoListBtn = document.getElementById('add-todo-btn');
var todoListInput = document.querySelector('.new-list-name');
addTodoListBtn.addEventListener('click', function(event) {
  event.preventDefault();
  appearInputTag(this, '.add-list-form', '.new-list-name');
});
todoListInput.addEventListener('keydown', keyDownHandlerOfTodoNameInput);

var addTodoBtn = document.getElementsByClassName('add-card');
var cardNameInput = document.getElementsByClassName('new-card-name');
var todoListFooters = document.getElementsByClassName('todolist-footer');
var todoItems = document.getElementsByClassName('todo-item');
for(var i=0; i<addTodoBtn.length; ++i){
  addTodoBtn[i].addEventListener('click', onClickListenerOfAddTodoBtn);
}
for(var i=0; i<cardNameInput.length; ++i){
  cardNameInput[i].addEventListener('keydown', keyDownHandlerOfCardNameInput);
}
for(var i=0; i<todoListFooters.length; ++i){
  addDnDHandlersForTodoListFooter(todoListFooters[i]);
}
for(var i=0; i<todoItems.length; ++i){
  addDnDHandlersForTodoItem(todoItems[i]);
}

var addCardXhr = new XMLHttpRequest();

addCardXhr.onload = function() {
  if(!(addCardXhr.status >= 200 && addCardXhr.status < 300)){
    console.error('Server cannot handle user request.');
  }
};