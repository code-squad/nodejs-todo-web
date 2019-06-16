const todoListMainDiv = document.querySelectorAll('.todo_list_main');
const storyInputText = document.querySelectorAll('.story_input');
const storyAddBtn = document.querySelectorAll('.story_add');

const dragDropEvent = new DragDropEvent();
for (let i = 0; i < todoListMainDiv.length; i++) {
    todoListMainDiv[i].parentNode.addEventListener('drop', () => dragDropEvent.drop(event) );
    todoListMainDiv[i].parentNode.addEventListener('dragover', () => dragDropEvent.dragOver(event) );
}

const addEvent = new AddEvent(dragDropEvent, todoListMainDiv, storyInputText, storyAddBtn);
for (let i = 0; i < storyAddBtn.length; i++) addEvent.click(i);
