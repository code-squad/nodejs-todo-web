const taskInput = document.getElementById("new-task");//Add a new task.
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
const completedTasksHolder = document.getElementById("completed-tasks");//ul of #completed-tasks
const inProgressTaskHolder = document.getElementById('inprogress-tasks');


//New task list item
const createNewTaskElement = function (taskString) {

    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");//checkbox
    const label = document.createElement("label");//label
    const editInput = document.createElement("input");//text
    const editButton = document.createElement("button");//edit button
    const deleteButton = document.createElement("button");//delete button

    label.innerText = taskString;

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
    return listItem;
};

const addTask = function () {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    const listItem = createNewTaskElement(taskInput.value);

};

//Edit an existing task.
const editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;

};


//Delete task.
const deleteTask = function () {
    console.log("Delete Task...");

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

};

//Mark task completed
const taskCompleted = function () {
    console.log("Complete Task...");

    const listItem = this.parentNode;
    console.log(listItem);
    completedTasksHolder.appendChild(listItem);

};

//Mark task incomplete
const taskIncomplete = function () {
    console.log("Incomplete Task...");
    const listItem = this.parentNode;
    console.log(listItem);
    incompleteTaskHolder.appendChild(listItem);
};

//Mark task in progress
const taskInProgress = function () {
    console.log("in Progress Task...");
    const listItem = this.parentNode;
    console.log(listItem);
    inProgressTaskHolder.appendChild(listItem);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    //select ListItems children
    const checkBox = taskListItem.querySelector("input[type=checkbox]");
    const editButton = taskListItem.querySelector("button.edit");
    const deleteButton = taskListItem.querySelector("button.delete");

    //Bind editTask to edit button.
    editButton.onclick = editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
};