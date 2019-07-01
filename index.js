class Title {
    constructor(name, dragging) {
        this.name = name;
        this.title;
        this.bin;
        this.dragging = dragging;
        this.userData;
    }

    setTitle() {
        const body = document.querySelector('body');
        const header = document.createElement('header');
        this.title = document.createElement('div');
        this.title.innerText = `${this.name}'s Todo`;
        header.appendChild(this.title);
        header.appendChild(this.setBin());
        header.classList.add('header');
        this.title.classList.add('title');
        body.insertBefore(header, body.firstChild);
    }

    setBin() {
        this.bin = document.createElement('IMG');
        this.bin.setAttribute('src', 'https://user-images.githubusercontent.com/26920620/59901372-fc627800-9435-11e9-8cb7-e7c3a9a39824.png');
        this.addDropListener(this.bin);
        this.bin.classList.add('bin');
        return this.bin;
    }

    addDropListener(div) {
        div.addEventListener('dragover', event => {
            event.preventDefault();
        });
        div.addEventListener('drop', event => {
            event.preventDefault();
            this.dragging.data.remove();
        });
    }
}

class ManagerSection {
    constructor(dragging) {
        this.dragging = dragging;
        this.main;
        this.addingSectionBox;
        this.textarea;
    }
    setManagerSection() {
        this.main = document.querySelector('main');
        this.section = document.createElement('section');
        const div = document.createElement('div');
        div.innerHTML = '<div>+ Add another list</div>';
        this.section.appendChild(div);
        this.addBoxOpenListener(div);
        this.section.appendChild(this.setAddingSectionBox());
        this.section.classList.add('managerSection');
        div.classList.add('addListButton');
        this.main.appendChild(this.section);
    }

    addBoxOpenListener(button) {
        button.addEventListener('click', (event) => {
            this.addingSectionBox.classList.toggle("hide");
            this.textarea.focus();
        });
    }

    setAddingSectionBox() {
        this.addingSectionBox = document.createElement('div');
        this.addingSectionBox.appendChild(this.setTextArea());
        this.addingSectionBox.appendChild(this.setButtonBox());
        this.addingSectionBox.classList.add('addingCardBox');
        this.addingSectionBox.classList.add("hide");

        return this.addingSectionBox;
    }

    setTextArea() {
        this.textarea = document.createElement('input');
        this.textarea.placeholder = "Please enter here.";
        this.addKeyListener(this.textarea);
        this.textarea.classList.add('cardTextArea');
        return this.textarea
    }

    addKeyListener(textarea) {
        textarea.addEventListener('keyup', event => {
            if (event.keyCode === 13) {
                this.addSection();
            }
        });
    }

    setButtonBox() {
        this.buttonBox = document.createElement('div');
        this.buttonBox.appendChild(this.setAddButton());
        this.buttonBox.appendChild(this.setCancleButton());
        this.buttonBox.classList.add('buttonBox');
        return this.buttonBox
    }

    setAddButton() {
        const button = document.createElement('button');
        button.innerText = '+';
        this.addCreateSectionListener(button);
        button.classList.add('addButton');

        return button;
    }

    addSection() {
        if (this.textarea.value === "") {
            alert("내용을 입력해 주세요");
            return;
        }
        const section = new Section(this.textarea.value, this.dragging);
        const newSection = section.setSection();

        this.textarea.value = "";
        this.addingSectionBox.classList.toggle("hide");

    }

    addCreateSectionListener(button) {
        button.addEventListener('click', (event) => {
            this.addSection();
        });
    }

    setCancleButton() {
        const button = document.createElement('button');
        button.innerText = 'X';
        this.addCancleAddingCardListener(button);
        button.classList.add('cancleButton');
        return button;
    }

    addCancleAddingCardListener(button) {
        button.addEventListener('click', (event) => {
            this.textarea.value = "";
            this.addingSectionBox.classList.toggle("hide");
        });
    }

}

class Section {
    constructor(name, index, dragging) {
        this.headerName = name;
        this.index = index;
        this.dragging = dragging;
        this.main;
        this.section;
        this.header;
        this.addingCardBox;
        this.textarea;
        this.cardBox;
    }

    setSection() {
        this.main = document.querySelector('main');
        this.section = document.createElement('section');
        this.section.appendChild(this.setHeader());
        this.section.appendChild(this.setOpenButton());
        this.section.appendChild(this.setAddingCardBox())
        this.section.appendChild(this.setCardBox());
        this.section.classList.add('section');
        this.section.setAttribute('draggable', 'true');
        this.addDragStartListener(this.section);
        this.main.insertBefore(this.section, this.main.lastElementChild);
    }

    addDragStartListener(section) {
        section.addEventListener('dragstart', event => {
            this.dragging.data = event.target;
        });
    }

    setCardBox() {
        this.cardBox = document.createElement('div');
        return this.cardBox;
    }

    setHeader() {
        this.header = document.createElement('header');
        this.header.innerText = `${this.headerName}`;
        this.addDropListener(this.header);
        this.header.classList.add('sectionHeader');
        return this.header;
    }

    setOpenButton() {
        const button = document.createElement('button');
        button.innerText = '+';
        this.addBoxOpenListener(button);
        this.addDropListener(button);
        button.classList.add('openButton');
        return button;
    }

    addBoxOpenListener(button) {
        button.addEventListener('click', (event) => {
            const addingCardBox = event.target.nextElementSibling;
            addingCardBox.classList.toggle("hide");
            this.textarea.focus();
        });
    }

    addDropListener(div) {
        div.addEventListener('dragover', event => {
            event.preventDefault();
        });
        div.addEventListener('drop', event => {
            if (this.dragging.data.tagName !== "ARTICLE") return;
            event.preventDefault();
            this.cardBox.insertBefore(this.dragging.data, this.cardBox.firstChild);
            
            setItems();
        });
    }

    setAddingCardBox() {
        this.addingCardBox = document.createElement('div');
        this.addingCardBox.appendChild(this.setTextArea());
        this.addingCardBox.appendChild(this.setButtonBox());
        this.addDropListener(this.addingCardBox);
        this.addingCardBox.classList.add('hide');
        this.addingCardBox.classList.add('addingCardBox');

        return this.addingCardBox
    }

    setTextArea() {
        this.textarea = document.createElement('input');
        this.textarea.placeholder = "Please enter here.";
        this.addKeyListener(this.textarea);
        this.textarea.classList.add('cardTextArea');
        return this.textarea
    }

    addKeyListener(textarea) {
        textarea.addEventListener('keyup', event => {
            if (event.keyCode === 13) {
                this.addCard();
            }
        });
    }

    setButtonBox() {
        this.buttonBox = document.createElement('div');
        this.buttonBox.appendChild(this.setAddButton());
        this.buttonBox.appendChild(this.setCancleButton());
        this.buttonBox.classList.add('buttonBox');
        return this.buttonBox
    }

    setAddButton() {
        const button = document.createElement('button');
        button.innerText = '+';
        button.classList.add('addButton');
        this.addCreateCardListener(button);

        return button;
    }
    addCard(text, index) {
        if (text) {
            const card = new Card(text, index, this.dragging);
            const newCard = card.setCard();
            this.cardBox.appendChild(newCard);
        } else {
            if (this.textarea.value === '') {
                alert("내용을 입력해 주세요");
                return;
            }
            data.userData[this.index].push(this.textarea.value);
            this.textarea.value = "";
            this.addingCardBox.classList.toggle("hide");
            saveData();
        }
    }

    addCreateCardListener(button) {
        button.addEventListener('click', (event) => {
            this.addCard();

        });
    }

    setCancleButton() {
        const button = document.createElement('button');
        button.innerText = 'X';
        this.addCancleAddingCardListener(button);
        button.classList.add('cancleButton');

        return button;
    }

    addCancleAddingCardListener(button) {
        button.addEventListener('click', (event) => {
            this.textarea.value = "";
            this.addingCardBox.classList.toggle("hide");
        });
    }


}

class Card {
    constructor(text, index, dragging) {
        this.text = text;
        this.index = index;
        this.dragging = dragging;
    }
    setCard() {
        const article = document.createElement('article');
        article.innerText = this.text;
        article.setAttribute('draggable', 'true');
        this.addDragStartListener(article);
        this.addDropListener(article);
        article.classList.add('card');

        return article;
    }

    addDragStartListener(article) {
        article.addEventListener('dragstart', event => {
            this.dragging.data = event.target;
        });
    }

    addDropListener(article) {
        article.addEventListener('dragover', event => {
            event.preventDefault();
        });
        article.addEventListener('drop', event => {
            if (this.dragging.data.tagName !== "ARTICLE") return;
            event.preventDefault();
            event.target.parentNode.insertBefore(this.dragging.data, event.target.nextElementSibling);
        });
    }

}
const data = {};
const clearBody = () => {
    const body = document.getElementById('body');
    body.innerHTML = '<main></main>';
}

const saveData = () => {
    const request = new XMLHttpRequest();
    request.onload = () => {
        const url = 'http://localhost:3000/index/saveData';
        if (request.status === 200) {
            if (request.responseURL === url) {
                setItems();
            }
        }
    
    }
    
    request.open('POST', './index/saveData');
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(data));
}



const setItems = () => {
    const request = new XMLHttpRequest();
    request.onload = () => {
        const url = 'http://localhost:3000/index/userData';
        if (request.status === 200) {
            if (request.responseURL === url) {
                clearBody();
                data.id = JSON.parse(request.responseText).id;
                data.userData = JSON.parse(request.responseText).data;
                const dragging = {};
                const title = new Title(data.id, dragging);
                title.setTitle();

                const managerSection = new ManagerSection(dragging);
                managerSection.setManagerSection();
                console.log(data.userData);

                for(let i = 0; i < data.userData.length; i++){
                    const section = new Section(data.userData[i][0], i, dragging);
                    section.setSection();
                    for(let j = 1; j < data.userData[i].length; j++){
                        section.addCard(data.userData[i][j], j);
                    }

                }
                return;
            }
        }
    
    }

    request.open('GET', './index/userData');
    request.send();
}

setItems();


