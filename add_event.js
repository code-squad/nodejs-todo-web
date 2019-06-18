class AddEvent {
    constructor(dragDropEvent, todoMainDiv, addText, addBtn) {
        this.dragDropEvent = dragDropEvent;
        this.todoMainDiv = todoMainDiv;
        this.addText = addText;
        this.addBtn = addBtn;
        this.count = 0;
    }

    createParentDiv() {
        const div = document.createElement('div');
        div.addEventListener('dragstart', () => dragDropEvent.drag(event) );
        div.id = 'drag' + this.count++;
        div.className = 'story';
        div.draggable = true;
        return div;
    }

    createChildInputButton() {
        const inputButton = document.createElement('input');
        inputButton.addEventListener('click', () => inputButton.parentNode.remove() );
        inputButton.setAttribute('type', 'button');
        inputButton.className = 'story_delete';
        inputButton.value = 'x';
        return inputButton;
    }

    createChildDiv(index) {
        const b = document.createElement('div');
        b.innerText = this.addText[index].value;
        b.className = 'story_inner_text';
        this.addText[index].value = '';
        return b;
    }

    AddStoryDiv(index) {
        const divStory = this.createParentDiv();
        divStory.appendChild(this.createChildInputButton());
        divStory.appendChild(this.createChildDiv(index));
        this.todoMainDiv[index].appendChild(divStory);
    }

    click(index) {
        this.addBtn[index].addEventListener('click', () => this.AddStoryDiv(index) );
    }
}