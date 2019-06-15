const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks"); //ul of #completed-tasks
const inProgressTaskHolder = document.getElementById('inprogress-tasks'); //ul of #inprogress-tasks


//New task list item
const createNewTaskElement = function (newTask) {

    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");//checkbox
    const label = document.createElement("label");//label
    const editInput = document.createElement("input");//text
    const editButton = document.createElement("button");//edit button
    const deleteButton = document.createElement("button");//delete button

    label.innerText = newTask;

    //Each elements, needs appending
    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.draggable = true;
    addDragEvent(listItem);
    return listItem;
};

const addTask = function () {
    console.log("Add Task...");
    const listItem = createNewTaskElement(taskInput.value);

    if (taskInput.value === '') {
        return window.alert('추가할 항목을 입력해주세요');
    }

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskInProgress);
    taskInput.value = "";

};

//Edit an existing task.
const editTask = function () {
    console.log("Edit Task...");
    const listItem = this.parentNode;

    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector("label");
    const containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {
        label.innerText = editInput.value;
    } else {
        editInput.value = label.innerText;
    }
    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


//Delete task.
const deleteTask = function () {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);

};

//Mark task completed
const taskCompleted = function () {
    console.log("Complete Task...");

    const listItem = this.parentNode;
    console.log(listItem);
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

//Mark task incomplete
const taskIncomplete = function () {
    console.log("Incomplete Task...");
    const listItem = this.parentNode;
    console.log(listItem);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskInProgress);
};

//Mark task in progress
const taskInProgress = function () {
    console.log("in Progress Task...");
    const listItem = this.parentNode;
    console.log(listItem);
    inProgressTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

// Bind event on addButton
addButton.onclick = addTask;
taskInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        addTask();
    }
});

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    //Bind Task to button.
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

const bindDragEventOnList = function () {
    const todoList_section = document.getElementById('todo-list');
    const doingList_section = document.getElementById('doing-list');
    const doneList_section = document.getElementById('completed-list');

    addDragEvent(todoList_section);
    addDragEvent(doingList_section);
    addDragEvent(doneList_section);

    //cycle over incompleteTaskHolder for each list item ul list
    for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
        bindTaskEvents(incompleteTaskHolder.children[i], taskInProgress);
        addDragEvent(incompleteTaskHolder.children[i]);
    }

    //cycle over completedTasksHolder for each item in ul list
    for (let i = 0; i < inProgressTaskHolder.children.length; i++) {
        bindTaskEvents(inProgressTaskHolder.children[i], taskCompleted);
        addDragEvent(inProgressTaskHolder.children[i]);
    }

    //cycle over completedTasksHolder for each item in ul list
    for (let i = 0; i < completedTasksHolder.children.length; i++) {
        bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
        addDragEvent(completedTasksHolder.children[i]);
    }
};


// drag and drop test code
let dragging = null;

const addDragEvent = function (listItem) {

    listItem.addEventListener('dragstart', function (event) {
        dragging = getLI(event.target);
        event.dataTransfer.setData('text/plain', null);
        event.dataTransfer.setDragImage(dragging, 0, 0);
    });

    listItem.addEventListener('dragover', function (event) {
        event.preventDefault();
        const target = getLI(event.target);
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
        const target = getLI(event.target);
        target.style['border-bottom'] = '';
        target.style['border-top'] = '';
    });

    listItem.addEventListener('drop', function (event) {
        event.preventDefault();
        const target = getLI(event.target);

        if (target.children.length === 2) {
            target.style['border-bottom'] = '';
            target.style['border-top'] = '';
            target.children[1].appendChild(dragging)
        } else if (target.style['border-bottom'] !== '') {
            target.style['border-bottom'] = '';
            target.parentNode.insertBefore(dragging, event.target.nextSibling);
        } else {
            target.style['border-top'] = '';
            target.parentNode.insertBefore(dragging, event.target);
        }
    });

    function getLI(target) {
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