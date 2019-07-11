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
const textAreaTodo = document.getElementById("dataTodo")
const textAreaDoing= document.getElementById("dataDoing")
const textAreaDone = document.getElementById("dataDone")

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
    makeChild("dataTarget_todo",textAreaTodo.value);
    textAreaTodo.value = "";
});

inputAddDoing.addEventListener("click", () => {
    display("openAdd_doing", "addData_doing"); 
    sendClientData("dataDoing"); 
    makeChild("dataTarget_doing",textAreaDoing.value);
    textAreaTodo.value = "";
});

inputAddDone.addEventListener("click", () => {
    display("openAdd_done", "addData_done"); 
    sendClientData("dataDone"); 
    makeChild("dataTarget_done",textAreaDone.value);
    textAreaTodo.value = "";
});

let dragging = null;
let listWrap = [document.getElementById("dataTarget_todo"), document.getElementById("dataTarget_doing"), document.getElementById("dataTarget_done")]

document.addEventListener('dragstart', (event) => { 
    dragging = event.target;
    event.dataTransfer.setData('text/html', dragging);

    document.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    listWrap.forEach((wrap)=>{
        wrap.addEventListener('dragenter', (event) => {
            event.target.style['border-bottom'] = 'solid 2px #0179BF';
        });
        wrap.addEventListener('dragleave', (event) => {
            event.target.style['border-bottom'] = '';
        });
        wrap.addEventListener('drop', (event) => {
            event.preventDefault();
            event.target.style['border-bottom'] = '';
            event.target.parentNode.insertBefore(dragging, event.target.nextSibling);
        });

    })
});