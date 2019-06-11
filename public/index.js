function getTodoListContainer (title) {
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

function getTodoItem (value) {
  return `<li class="collection-item todo-item"><div>${value}</div></li>`
}

function appendChildInTargetNode(target, htmlText) {
  var parser = new DOMParser();
  var newDOM = parser.parseFromString(htmlText, 'text/html');
  target.appendChild(newDOM.body.firstChild);
}

function onClickListenerOfAddCard (event) {
  event.preventDefault();
  this.classList.add('hide-element');
  var form = this.parentNode.querySelector('.add-card-form');
  form.classList.remove('hide-element');
  form.querySelector('.new-card-name').focus();
}

function newCardNameInputTagListener (event) {
  var key = event.which || event.keyCode;

  if(key === 13){
    if(this.value === '') return;
    var target = this.parentNode.parentNode.parentNode.querySelector('.collection');
    appendChildInTargetNode(target, getTodoItem(this.value));

    var addCardBtn = this.parentNode.parentNode.querySelector('.add-card');
    addCardBtn.classList.remove('hide-element');
    this.parentNode.classList.add('hide-element');
    this.value = "";
  }

  // var cardName = this.value;
  // if(cardName === undefined)  
}

var selectAddCardBtn = document.getElementsByClassName('add-card');
var newCardNameInput = document.getElementsByClassName('new-card-name');

for(var i=0; i<selectAddCardBtn.length; ++i){
  selectAddCardBtn[i].addEventListener('click', onClickListenerOfAddCard);
}

for(var i=0; i<newCardNameInput.length; ++i){
  newCardNameInput[i].addEventListener('keypress', newCardNameInputTagListener);
}