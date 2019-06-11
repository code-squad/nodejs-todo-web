function onClickListenerOfAddCard (event) {
  event.preventDefault();
  this.classList.add('hide-element');
  var form = this.parentNode.getElementsByClassName('add-card-form');
  console.log(form);
  form[0].classList.remove('hide-element');
}

// function pressEnterListener (event) {
//   event.preventDefault();
//   var cardName = this.value;
//   if(cardName === undefined)  
// }

var selectAddCardBtn = document.getElementsByClassName('add-card');
console.log(selectAddCardBtn);

for(var i=0; i<selectAddCardBtn.length; ++i){
  selectAddCardBtn[i].addEventListener('click', onClickListenerOfAddCard);
}