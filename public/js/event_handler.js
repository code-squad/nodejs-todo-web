const todoListMainDiv   = document.querySelectorAll('.todo_list_main');
const storyInputText    = document.querySelectorAll('.story_input');
const storyAddBtn       = document.querySelectorAll('.story_add');
const signOutButton     = document.querySelector('#SignOutButton');

const dragDropEvent = new DragDropEvent();
const addEvent = new AddEvent(dragDropEvent, todoListMainDiv, storyInputText);

// show
fetch('http://localhost:8888/showTodo', { method : 'post' })
.then(response => { return response.json(); })
.then(json => {
    for (const element of todoListMainDiv) {
        element.parentNode.addEventListener('drop', () => dragDropEvent.drop(event) );
        element.parentNode.addEventListener('dragover', () => dragDropEvent.dragOver(event) );
    }

    const todoList = Object.values(json);
    for (let todoListIndex = 0; todoListIndex < todoList.length; todoListIndex++) {
        let itemIndex = 0;
        todoList[todoListIndex].forEach(element => {
            addEvent.AddStoryDiv(todoListIndex, itemIndex++, element);
        });
    }
});

// add
for (let i = 0; i < storyAddBtn.length; i++) {
    storyAddBtn[i].addEventListener('click', () => {
        const type = ['todo', 'doing', 'done'];
        const value = storyInputText[i].value;
        const index = todoListMainDiv[i].childElementCount;
        const body = JSON.stringify({ type : type[i], index : index, value : value });
        fetch('http://localhost:8888/addTodo', { method : 'post', redirect : 'follow', body : body })
        .then((response) => {
            switch (response.status) {
                case 200 : addEvent.AddStoryDiv(i, index, undefined);   break;
                case 302 : window.location.href = '/signIn?';           break;
                default  : alert(`HTTP status : ${response.status}`);   break;
            }
        });
    });
}

// signOut
signOutButton.addEventListener('click', () => {
    fetch('http://localhost:8888/signOut', { method : 'post', redirect : 'follow' })
    .then(response => { 
        switch (response.status) {
            case 403: alert(`회원 정보가 존재하지 않습니다!`); break;
            case 302: window.location.href = '/'; break;
            default: alert(`HTTP status : ${response.status}`); break;
        }
    });
});