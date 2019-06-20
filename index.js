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
    constructor(name){
        this.headerName = name;
        this.main;
        this.section;
        this.header;
        this.addingCardBox;
        this.textarea;
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

        return this.header;
    }

    setOpenButton(){
        const button = document.createElement('button');
        button.innerText = '+';
        this.addBoxOpenListener(button);
        
        return button;
    }

    addBoxOpenListener(button){
        button.addEventListener('click', (event) => {
            const addingCardBox = event.target.nextElementSibling;
            addingCardBox.classList.toggle("adding-box");
            this.textarea.focus();
        });
    }

    setAddingCardBox(){
        this.addingCardBox = document.createElement('div');
        this.addingCardBox.appendChild(this.setTextArea());
        this.addingCardBox.appendChild(this.setButtonBox());
    
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
           const card = new Card(this.textarea.value);
           const newCard = card.setCard();
           this.cardBox.appendChild(newCard);
           this.textarea.value = "";
           this.addingCardBox.classList.toggle("adding-box");

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
            this.addingCardBox.classList.toggle("adding-box");
         });
    }


}

class Card{
    constructor(text){
        this.text = text;
    }
    setCard(){
        const article = document.createElement('article');
        article.innerText = this.text;
        return article;
    }

}

const setIndexPage = () =>{
    const title = new Title('Wangmin');
    title.setTitle();
    
    const todoSection = new Section('todo');
    todoSection.setSection();
    const doingSection = new Section('doing');
    doingSection.setSection();
    const doneSection = new Section('done');
    doneSection.setSection();
}

setIndexPage();