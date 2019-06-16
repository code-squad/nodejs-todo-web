class AddEvent {
    constructor(dragDropEvent, todoMainDiv, addText, addBtn) {
        this.dragDropEvent = dragDropEvent;
        this.todoMainDiv = todoMainDiv;
        this.addText = addText;
        this.addBtn = addBtn;
        this.count = 0;
    }

    AddStoryDiv(index) {
        const divStory = document.createElement('div');
        divStory.addEventListener('dragstart', () => dragDropEvent.drag(event) );
        divStory.id = 'drag' + this.count++;
        divStory.className = 'story';
        divStory.draggable = true;

        const inputButton = document.createElement('input');
        inputButton.addEventListener('click', () => inputButton.parentNode.remove() );
        inputButton.setAttribute('type', 'button');
        inputButton.className = 'story_delete';
        inputButton.value = 'x';

        const br = document.createElement('br');
        const b = document.createElement('b');
        b.innerText = this.addText[index].value;
        b.className = 'story_inner_text';
        this.addText[index].value = '';

        divStory.append(inputButton);
        divStory.append(br);
        divStory.append(b);

        this.todoMainDiv[index].appendChild(divStory);
    }

    click(index) {
        this.addBtn[index].addEventListener('click', () => this.AddStoryDiv(index) );
    }
}