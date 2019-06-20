class Title {
    constructor(name){
        this.name = name;
    }

    setTitle(){
        const body = document.querySelector('body');
        const header = document.createElement('header');
        header.innerHTML = `<h1>${this.name}'s Todo</h1>`;
        body.insertBefore(header,body.firstChild);

    }
}

class Section{
    constructor(name,dragging){
        this.headerName = name;
        this.dragging = dragging;
        this.main;
        this.section;
        this.header;
        this.addingCardBox;
        this.textarea;
        this.cardBox;
    }

    setSection(){
        this.main = document.querySelector('main');
        this.section = document.createElement('section');
        this.section.appendChild(this.setHeader());
        this.section.appendChild(this.setOpenButton());
        this.section.appendChild(this.setAddingCardBox())
        this.section.appendChild(this.setCardBox());
        this.main.appendChild(this.section);
    }

    setCardBox(){
        this.cardBox = document.createElement('div');
        return this.cardBox;
    }

    setHeader(){
        this.header = document.createElement('header');
        this.header.innerHTML = `<h1>${this.headerName}</h1>`;
        this.addDropListener(this.header);
        return this.header;
    }

    setOpenButton(){
        const button = document.createElement('button');
        button.innerText = '+';
        this.addBoxOpenListener(button);
        this.addDropListener(button);
        
        return button;
    }

    addBoxOpenListener(button){
        button.addEventListener('click', (event) => {
            const addingCardBox = event.target.nextElementSibling;
            addingCardBox.classList.toggle("hide");
            this.textarea.focus();
        });
    }

    addDropListener(div){
        div.addEventListener('dragover', event =>{
            event.preventDefault();
        });
        div.addEventListener('drop', event =>{
            event.preventDefault();
            this.cardBox.insertBefore(this.dragging.data, this.cardBox.firstChild);
        });
    }

    setAddingCardBox(){
        this.addingCardBox = document.createElement('div');
        this.addingCardBox.appendChild(this.setTextArea());
        this.addingCardBox.appendChild(this.setButtonBox());
        this.addDropListener(this.addingCardBox);
        this.addingCardBox.classList.add('hide');

        return this.addingCardBox
    }

    setTextArea(){
        this.textarea = document.createElement('textarea');
        this.textarea.placeholder = "Please enter here.";

        return this.textarea
    }

    setButtonBox(){
        this.buttonBox = document.createElement('div');
        this.buttonBox.appendChild(this.setAddButton());
        this.buttonBox.appendChild(this.setCancleButton());
    
        return this.buttonBox
    }

    setAddButton(){
        const button = document.createElement('button');
        button.innerText = 'add';
        this.addCreateCardListener(button);

        return button;
    }

    addCreateCardListener(button){
        button.addEventListener('click', (event) => {
           if(this.textarea.value === ""){
               alert("내용을 입력해 주세요");
               return;
           }
           const card = new Card(this.textarea.value, this.dragging);
           const newCard = card.setCard();
           this.cardBox.appendChild(newCard);
           this.textarea.value = "";
           this.addingCardBox.classList.toggle("hide");

        });
    }

    setCancleButton(){
        const button = document.createElement('button');
        button.innerText = 'cancle';
        this.addCancleAddingCardListener(button);

        return button;
    }

    addCancleAddingCardListener(button){
        button.addEventListener('click', (event) => {
            this.textarea.value = "";
            this.addingCardBox.classList.toggle("hide");
         });
    }


}

class Card{
    constructor(text, dragging){
        this.text = text;
        this.dragging = dragging;
    }
    setCard(){
        const article = document.createElement('article');
        article.innerText = this.text;
        article.setAttribute('draggable','true');
        this.addDragStartListener(article);
        this.addDropListener(article);

        return article;
    }

    addDragStartListener(article){
        article.addEventListener('dragstart', event => {
            this.dragging.data = event.target;
        });
    }

    addDropListener(article){
        article.addEventListener('dragover', event =>{
            event.preventDefault();
        });
        article.addEventListener('drop', event =>{
            event.preventDefault();
            event.target.parentNode.insertBefore(this.dragging.data, event.target.nextElementSibling);
        });
    }

}

const setIndexPage = () =>{
    const title = new Title('Wangmin');
    title.setTitle();
    
    const dragging = {};
    
    const todoSection = new Section('todo',dragging);
    todoSection.setSection();
    const doingSection = new Section('doing',dragging);
    doingSection.setSection();
    const doneSection = new Section('done',dragging);
    doneSection.setSection();
}

setIndexPage();