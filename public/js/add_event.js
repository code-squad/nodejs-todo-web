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

    createChildInputButton() {
        const inputButton = document.createElement('input');
        inputButton.addEventListener('click',  () => {
            const type = ['todo', 'doing', 'done'];
            const deleteObject = JSON.parse(inputButton.parentNode.id);
            const body = JSON.stringify({ type : type[deleteObject.type], index : deleteObject.index });
            fetch('http://localhost:8888/deleteTodo', { method : 'post', redirect : 'follow', body : body })
            .then((response) => {
                switch (response.status) {
                    case 200 : 
                        const todoListMain = inputButton.parentNode.parentNode;
                        const todoListMainlength = todoListMain.childElementCount - 1;
                        inputButton.parentNode.remove();
                        for (let index = 0; index < todoListMainlength; index++) {
                            const temp = JSON.parse(todoListMain.childNodes.item(index).id);
                            temp.index = index;
                            todoListMain.childNodes.item(index).id = JSON.stringify(temp);
                        }       
                        break;
                    case 302 : window.location.href = '/signIn?';           break;
                    default  : alert(`HTTP status : ${response.status}`);   break;
                }
            });
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
        divStory.appendChild(this.createChildInputButton());
        divStory.appendChild(this.createChildDiv(todoListIndex, value));
        this.todoMainDiv[todoListIndex].appendChild(divStory);
    }
}