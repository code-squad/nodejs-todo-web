class AddEvent {
    constructor(dragDropEvent, todoMainDiv, addText) {
        this.dragDropEvent = dragDropEvent;
        this.todoMainDiv = todoMainDiv;
        this.addText = addText;
    }

    createParentDiv(todoListIndex, itemIndex) {
        const div = document.createElement('div');
        div.addEventListener('dragstart', () => dragDropEvent.drag(event) );
        div.id = JSON.stringify({ type : todoListIndex, index : itemIndex });
        div.className = 'story';
        div.draggable = true;
        return div;
    }

    createChildInputButton(todoListIndex, itemIndex) {
        const inputButton = document.createElement('input');
        inputButton.addEventListener('click',  () => {
            const type = ['todo', 'doing', 'done'];
            const body = JSON.stringify({ type : type[todoListIndex], index : itemIndex });
            fetch('http://localhost:8888/delete', { method : 'post', body : body });
            inputButton.parentNode.remove(); 
        });
        inputButton.setAttribute('type', 'button');
        inputButton.className = 'story_delete';
        inputButton.value = 'x';
        return inputButton;
    }

    createChildDiv(todoListIndex, value) {
        const b = document.createElement('div');
        b.innerText = (value === undefined) ? this.addText[todoListIndex].value : value;
        b.className = 'story_inner_text';
        this.addText[todoListIndex].value = '';
        return b;
    }

    AddStoryDiv(todoListIndex, itemIndex, value) {
        const divStory = this.createParentDiv(todoListIndex, itemIndex);
        divStory.appendChild(this.createChildInputButton(todoListIndex, itemIndex));
        divStory.appendChild(this.createChildDiv(todoListIndex, value));
        this.todoMainDiv[todoListIndex].appendChild(divStory);
    }
}