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
        this.title.setAttribute('draggable', 'true');
        this.addDragStartListener(this.title);

        body.insertBefore(header, body.firstChild);
    }

    setBin() {
        this.bin = document.createElement('IMG');
        this.bin.setAttribute('src', 'https://user-images.githubusercontent.com/26920620/59901372-fc627800-9435-11e9-8cb7-e7c3a9a39824.png');
        this.addDropListener(this.bin);
        this.bin.classList.add('bin');
        return this.bin;
    }

    addDragStartListener(article) {
        article.addEventListener('dragstart', event => {
            this.dragging.data = event.target;
        });
    }

    addDropListener(div) {
        div.addEventListener('dragover', event => {
            event.preventDefault();
        });
        div.addEventListener('drop', event => {
            event.preventDefault();
            if (this.dragging.data.className == 'title') {
                const request = new XMLHttpRequest();
                request.onload = () => {
                    const url = 'http://localhost:3000/login';
                    if (request.status === 200) {
                        if (request.responseURL === url) {
                            return window.location.replace(request.responseURL);
                        }
                    }

                }
                request.open('POST', './todo/logout');
                request.send();
                return;
            }
            const [draggingSectionIndex, draggingObjectIndex] = getIndex(this.dragging.data.id);
            if (draggingSectionIndex == 'section') {
                data.userData.splice(Number(draggingObjectIndex), 1);
            } else {
                data.userData[Number(draggingSectionIndex)].splice(Number(draggingObjectIndex), 1);
            }
            saveData();
        });
    }
}

class ManagerSection {
    constructor(dragging) {
        this.dragging = dragging;
        this.main;
        this.addingSectionBox;
        this.textarea;
        this.buttonText = {
            add : '+',
            cancle : 'X'
        }
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
        button.innerText = this.buttonText.add;
        this.addCreateSectionListener(button);
        button.classList.add('addButton');

        return button;
    }

    addSection() {
        if (this.textarea.value === "") {
            alert("내용을 입력해 주세요");
            return;
        }

        data.userData.push([`${this.textarea.value}`]);
        this.textarea.value = "";
        this.addingSectionBox.classList.toggle("hide");

        saveData();

    }

    addCreateSectionListener(button) {
        button.addEventListener('click', (event) => {
            this.addSection();
        });
    }

    setCancleButton() {
        const button = document.createElement('button');
        button.innerText = this.buttonText.cancle;
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
        this.buttonText = {
            add : '+',
            cancle : 'X'
        }
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
        this.section.setAttribute('id', `section$${this.index}`);
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
        this.header.setAttribute("id", `${this.index}$header`);
        return this.header;
    }

    setOpenButton() {
        const button = document.createElement('button');
        button.innerText = this.buttonText.add;
        this.addBoxOpenListener(button);
        this.addDropListener(button);
        button.classList.add('openButton');
        button.setAttribute("id", `${this.index}$openButton`);
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
            const [draggingSectionIndex, draggingCardIndex] = getIndex(this.dragging.data.id);
            const [targetSectionIndex, targetCardIndex] = getIndex(event.target.id);
            const dragginCard = data.userData[Number(draggingSectionIndex)].splice(Number(draggingCardIndex), 1)[0];
            data.userData[Number(targetSectionIndex)].splice(1, 0, dragginCard);

            saveData();
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
        button.innerText = this.buttonText.add;
        button.classList.add('addButton');
        this.addCreateCardListener(button);

        return button;
    }
    addCard(text, index) {
        if (text) {
            const card = new Card(text, index, this.dragging);
            const newCard = card.setCard();
            newCard.setAttribute("id", `${this.index}$${index}`);
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
        button.innerText = this.buttonText.cancle;
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
            const [draggingSectionIndex, draggingCardIndex] = getIndex(this.dragging.data.id);
            const [targetSectionIndex, targetCardIndex] = getIndex(event.target.id);
            const dragginCard = data.userData[Number(draggingSectionIndex)].splice(Number(draggingCardIndex), 1)[0];
            data.userData[Number(targetSectionIndex)].splice(Number(targetCardIndex) + 1, 0, dragginCard);

            saveData();
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
        const url = 'http://localhost:3000/todo/saveData';
        if (request.status === 200) {
            if (request.responseURL === url) {
                setItems();
            }
        }

    }

    request.open('PUT', './todo/saveData');
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify(data));
}

const getIndex = (str) => {
    return str.split('$');
}

const setItems = () => {
    const request = new XMLHttpRequest();
    request.onload = () => {
        const url = 'http://localhost:3000/todo/userData';
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
                for (let i = 0; i < data.userData.length; i++) {
                    const section = new Section(data.userData[i][0], i, dragging);
                    section.setSection();
                    for (let j = 1; j < data.userData[i].length; j++) {
                        section.addCard(data.userData[i][j], j);
                    }

                }
                return;
            }
        }

    }

    request.open('GET', './todo/userData');
    request.send();
}

setItems();


