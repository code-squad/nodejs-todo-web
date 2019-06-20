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
        section.appendChild(this.setHeader());
        section.appendChild(this.setOpenButton());
        section.appendChild(this.setAddingCardBox());
        this.main.appendChild(this.section);
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
           this.section.appendChild(newCard);
           this.textarea.value = "";
           addingCardBox.classList.toggle("adding-box");

        });
    }

    setCancleButton(){
        const button = document.createElement('button');
        button.innerText = 'cancle';
        this.addCancleAddingCardListener(button);

        return button;
    }
    // cancle클릭이벤트 리스너 추가하기(){
    //     textarea 가져오기
    //     textarea 비우기
    //     내용입력부분 숨기기 클래스 토글하기
    // }
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

const title = new Title('Wangmin');
title.setTitle();

const section = new Section('todo');

section.setSS();
