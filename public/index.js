function getTodoListContainer(title) {
  return `<div class="todo-column todolist-container grey lighten-2" draggable="true">
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

function appendChildInTargetNode(target, htmlText) {
  var parser = new DOMParser();
  var newDOM = parser.parseFromString(htmlText, 'text/html');
  addDnDHandlersForTodoItem(newDOM.body.firstChild);
  target.appendChild(newDOM.body.firstChild);
}

function appearInputTag(addCardBtn) {
  addCardBtn.classList.add('hide-element');
  var form = addCardBtn.parentNode.querySelector('.add-card-form');
  form.classList.remove('hide-element');
  form.querySelector('.new-card-name').focus();
}

function hideInputTag(newCardInput) {
  var addCardBtn = newCardInput.parentNode.parentNode.querySelector('.add-card');
  addCardBtn.classList.remove('hide-element');
  newCardInput.parentNode.classList.add('hide-element');
  newCardInput.value = "";
}

function onClickListenerOfAddCard(event) {
  event.preventDefault();
  appearInputTag(this);
}

function newCardNameInputTagListener(event) {
  var key = event.which || event.keyCode;

  if(key === 13){
    if(this.value === '') return;
    var target = this.parentNode.parentNode.parentNode.querySelector('.collection');
    appendChildInTargetNode(target, getTodoItem(this.value));
    hideInputTag(this);
  }

  if(key === 27){
    hideInputTag(this);
  }
}

// Todo Item Drag event handler 

function handleDragStart(event) {
  dragSrcEl = this;

  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('dragElem');
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
  this.classList.remove('dragElem');
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

// Todo Item Drag event handler end.

var selectAddCardBtn = document.getElementsByClassName('add-card');
var newCardNameInput = document.getElementsByClassName('new-card-name');
var todoItem = document.getElementsByClassName('todo-item');
var test = document.getElementsByClassName('todolist-footer');

for(var i=0; i<selectAddCardBtn.length; ++i){
  selectAddCardBtn[i].addEventListener('click', onClickListenerOfAddCard);
}

for(var i=0; i<newCardNameInput.length; ++i){
  newCardNameInput[i].addEventListener('keydown', newCardNameInputTagListener);
}

for(var i=0; i<todoItem.length; ++i){
  addDnDHandlersForTodoItem(todoItem[i]);
}

for(var i=0; i<test.length; ++i){
  addDnDHandlersForTodoListFooter(test[i]);
}