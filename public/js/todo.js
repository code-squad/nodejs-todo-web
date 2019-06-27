const taskInput = document.getElementById("new-task");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks"); //ul of #completed-tasks
const inProgressTaskHolder = document.getElementById('inprogress-tasks'); //ul of #inprogress-tasks

const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', function (event) {

    const logout = () => {
        const options = {
            method  : 'POST',
            redirect: 'follow',
            headers : new Headers({
                'Content-Type': 'text/plain'
            })
        };
        return fetch('/logout', options)
            .then(response => {
                if (response.redirected) {
                    window.location.href = '/';
                }
            })
    };
    logout();
});

// New task list item
const createNewTaskElement = function (newTask, id, status) {

    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    label.innerText = newTask;
    label.id = id;
    label.className = status;

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.draggable = true;
    addEnterKeyEvent(editInput, editTask);
    addDragEvent(listItem);
    return listItem;
};

const fetchData = function (url, data) {
    const options = {
        method : 'POST',
        body   : data,
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };
    return fetch(url, options)
};

const addTask = async function () {
    console.log("Add Task...");
    if (taskInput.value === '') {
        window.alert('추가할 항목을 입력해주세요');
    } else {

        // const response = await fetch('/api/addTask', options);
        const response = await fetchData('/api/addTask', `title=${taskInput.value}&status=todo`);
        const listItem_fromDB = await response.json();
        const {id, title, status} = listItem_fromDB;
        const listItem = createNewTaskElement(title, id, status);
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskInProgress);
        taskInput.value = "";
    }

};

const getListItemID = function (listItem) {
    return  listItem.querySelector('label').id;
};

const editTask = async function (event) {
    console.log("Edit Task...");
    const listItem = event.target.parentNode;

    const todoTask = listItem.querySelector("label");
    const editInput = listItem.querySelector('input[type=text]');
    const containsClass = listItem.classList.contains("editMode");
    const edit_button = listItem.querySelector('button.edit');
    const delete_button = listItem.querySelector('button.delete');
    const item_id = getListItemID(listItem);

    //If class of the parent is .editmode
    if (containsClass) {
        const response = await fetchData('/api/updateTask', `item_id=${item_id}&updated_title=${editInput.value}`);
        const {id, title, status}  = await response.json();

        todoTask.innerText = title;
        todoTask.hidden = false;
        edit_button.innerText = 'Edit';
        delete_button.hidden = false;

    } else {
        editInput.value = todoTask.innerText;
        todoTask.hidden = true;
        edit_button.innerText = 'save';
        delete_button.hidden = true;
    }
    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
    editInput.focus();
};


const deleteTask = async function () {
    console.log("Delete Task...");
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    const item_id = getListItemID(listItem);
    const response = await fetchData('/api/deleteTask', `item_id=${item_id}`);
    const deletedItem = await response.json();
    if (deletedItem) {
        ul.removeChild(listItem);
    }

};

const taskCompleted = function (event) {
    console.log("Complete Task...");
    event.target.checked = true;
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function (event) {
    console.log("Incomplete Task...");
    event.target.checked = false;
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskInProgress);
};

const taskInProgress = function (event) {
    console.log("in Progress Task...");
    event.target.checked = false;
    const listItem = this.parentNode;
    inProgressTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

const bindEventOnExistingItem = function (taskHolder, checkBoxEvent) {
    Object.keys(taskHolder.children).forEach(v => {
        bindTaskEvents(taskHolder.children[v], checkBoxEvent);
        addDragEvent(taskHolder.children[v])
    });
};

const bindDragEventOnList = function () {
    // Bind event on addButton
    const addButton = document.getElementById('add-button');
    addButton.onclick = addTask;
    addEnterKeyEvent(taskInput, addTask);

    const todoList_section = document.getElementById('todo-list');
    const doingList_section = document.getElementById('doing-list');
    const doneList_section = document.getElementById('done-list');

    const todo_editInput = todoList_section.querySelector('input[type=text]');
    const doing_editInput = doingList_section.querySelector('input[type=text]');
    const done_editInput = doneList_section.querySelector('input[type=text]');

    addEnterKeyEvent(todo_editInput, editTask);
    addEnterKeyEvent(doing_editInput, editTask);
    addEnterKeyEvent(done_editInput, editTask);

    addDragEvent(todoList_section);
    addDragEvent(doingList_section);
    addDragEvent(doneList_section);

    bindEventOnExistingItem(incompleteTaskHolder, taskInProgress);
    bindEventOnExistingItem(inProgressTaskHolder, taskCompleted);
    bindEventOnExistingItem(completedTasksHolder, taskIncomplete);

};

const addEnterKeyEvent = function (taskInput, eventHandler) {
    taskInput.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            eventHandler(event)
        }
    })
};


let draggingTarget = null;

const addDragEvent = function (listItem) {

    listItem.addEventListener('dragstart', function (event) {
        draggingTarget = getDragTarget(event.target);
        // event.dataTransfer.setData('text/plain', null);
        event.dataTransfer.setDragImage(draggingTarget, 0, 0);
    });

    listItem.addEventListener('dragover', function (event) {
        event.preventDefault();
        const target = getDragTarget(event.target);
        const bounding = target.getBoundingClientRect();
        const offset = bounding.y + (bounding.height / 2);

        if (event.clientY - offset > 0) {
            target.style['border-bottom'] = 'solid 4px black';
            target.style['border-top'] = '';
        } else {
            target.style['border-top'] = 'solid 4px black';
            target.style['border-bottom'] = '';
        }
    });

    listItem.addEventListener('dragleave', function (event) {
        const target = getDragTarget(event.target);
        target.style['border-bottom'] = '';
        target.style['border-top'] = '';
    });

    listItem.addEventListener('drop', function (event) {
        event.preventDefault();
        const target = getDragTarget(event.target);
        if (target.children.length === 2) {
            target.style['border-bottom'] = '';
            target.style['border-top'] = '';
            target.children[1].appendChild(draggingTarget)
        } else if (target.style['border-bottom'] !== '') {
            target.style['border-bottom'] = '';
            target.parentNode.insertBefore(draggingTarget, event.target.nextSibling);
        } else {
            target.style['border-top'] = '';
            target.parentNode.insertBefore(draggingTarget, event.target);
        }
    });

    function getDragTarget(target) {
        while (target.nodeName.toLowerCase() !== 'div' && target.nodeName.toLowerCase() !== 'li' && target.nodeName.toLowerCase() !== 'body') {
            target = target.parentNode;
        }
        if (target.nodeName.toLowerCase() === 'body') return false;
        else if (target.nodeName.toLowerCase() === 'div') return target;
        else return target;
    }
};

const init = function () {
    bindDragEventOnList();
};
init();