class AddEvent {
    constructor(dragDropEvent, todoMainDiv, addText, addBtn) {
        this.dragDropEvent = dragDropEvent;
        this.todoMainDiv = todoMainDiv;
        this.addText = addText;
        this.addBtn = addBtn;
        this.count = 0;
    }

    createElementDiv() {
        const div = document.createElement('div');
        div.addEventListener('dragstart', () => dragDropEvent.drag(event) );
        div.id = 'drag' + this.count++;
        div.className = 'story';
        div.draggable = true;
        return div;
    }

    createElementInput(type) {
        const inputButton = document.createElement('input');
        inputButton.addEventListener('click', () => inputButton.parentNode.remove() );
        inputButton.setAttribute('type', type);
        inputButton.className = 'story_delete';
        inputButton.value = 'x';
        return inputButton;
    }

    createElementBr() {
        return document.createElement('br');
    }

    createElementB(index) {
        const b = document.createElement('b');
        b.innerText = this.addText[index].value;
        b.className = 'story_inner_text';
        this.addText[index].value = '';
        return b;
    }

    createElement(...info) {
        switch (info[0]) {
            case 'div':   return this.createElementDiv();
            case 'input': return this.createElementInput('button');
            case 'br':    return this.createElementBr();
            case 'b':     return this.createElementB(info[1]);
        }
    }

    AddStoryDiv(index) {
        const divStory = this.createElementDiv();
        divStory.appendChild(this.createElement('input'));
        divStory.appendChild(this.createElement('br'));
        divStory.appendChild(this.createElement('b', index));
        this.todoMainDiv[index].appendChild(divStory);
    }

    click(index) {
        this.addBtn[index].addEventListener('click', () => this.AddStoryDiv(index) );
    }
}