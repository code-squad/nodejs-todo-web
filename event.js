const display = (displayID, displayNoneID) => {
    console.log(document.getElementById(displayID));
    document.getElementById(displayID).style.display="inherit";
    document.getElementById(displayNoneID).style.display="none";
}

const callAppendChild = (targetId, valueId) => { 
    const data = document.getElementById(valueId).value;
    const text = document.createTextNode(data); 
    const target = document.getElementById(targetId); 
    const li = document.createElement('li'); 
    const span = document.createElement('span'); 
    if(data !== ""){
        li.classList.add("contents")
        li.appendChild(text); 
        li.appendChild(span); 
        span.classList.add("deleteData")
        span.classList.add("icon-hamburger-menu-close")
        target.appendChild(li); 
        document.getElementById(valueId).value = "";   
        
        // li.setAttribute('draggable', true); 
        // li.setAttribute('ondragstart', "drag(event)"); 

        li.addEventListener("mouseover", ()=>{span.style.display = "block";}, false)
        li.addEventListener("mouseout", ()=>{span.style.display = "none";}, false)
        span.addEventListener("click", ()=>{target.removeChild(li);}, false)
    }
}

// function allowDrop(ev) {
//     var cols = document.querySelectorAll('#drag-list_.drag-row');
//    var colsLength = cols.length;

//    for (var i = 0; i < colsLength; i++) 
//    {
//       li.addEventListener('dragstart', dragStart, false);
//       li.addEventListener('drag', dragIng, false);
//       li.addEventListener('dragenter', dragEnter, false);
//       li.addEventListener('dragover', dragOver, false);
//       li.addEventListener('dragleave', dragLeave, false);
//       li.addEventListener('drop', dragDrop, false);
//       li.addEventListener('dragend', dragEnd, false)
// //    }
// function allowDrop(ev) {
//     ev.preventDefault();
// }
 
// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }
 
// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }