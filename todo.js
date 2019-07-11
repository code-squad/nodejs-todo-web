const body = document.getElementById("init")
const addTodo = document.getElementById("addTodo")
const addDoing = document.getElementById("addDoing")
const addDone = document.getElementById("addDone")
const inputAddTodo = document.getElementById("inputAddTodo")
const inputAddDoing = document.getElementById("inputAddDoing")
const inputAddDone = document.getElementById("inputAddDone")
const backTodo = document.getElementById("backTodo")
const backDoing = document.getElementById("backDoing")
const backDone = document.getElementById("backDone")
const textAreaTodoValue = document.getElementById("dataTodo").value
const textAreaDoingValue = document.getElementById("dataDoing").value
const textAreaDoneValue = document.getElementById("dataDone").value

body.addEventListener("load", getData());

addTodo.addEventListener("click", () => {display("addData_todo", "openAdd_todo")} );
addDoing.addEventListener("click", () => {display("addData_doing", "openAdd_doing")} );
addDone.addEventListener("click", () => {display("addData_done", "openAdd_done")} );
backTodo.addEventListener("click", () => {display("openAdd_todo", "addData_todo")} );
backDoing.addEventListener("click", () => {display("openAdd_doing", "addData_doing")} );
backDone.addEventListener("click", () => {display("openAdd_done", "addData_done")} );

inputAddTodo.addEventListener("click", () => {
    display("openAdd_todo", "addData_todo"); 
    sendClientData("dataTodo");
    makeChild("dataTarget_todo","textAreaTodoValue");
});

inputAddDoing.addEventListener("click", () => {
    display("openAdd_doing", "addData_doing"); 
    sendClientData("dataDoing"); 
    makeChild("dataTarget_doing","textAreaDoingValue");
});

inputAddDone.addEventListener("click", () => {
    display("openAdd_done", "addData_done"); 
    sendClientData("dataDone"); 
    makeChild("dataTarget_done","textAreaDoneValue");
});