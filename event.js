const display = (displayID, displayNoneID) => {
    console.log(document.getElementById(displayID));
    document.getElementById(displayID).style.display="inherit";
    document.getElementById(displayNoneID).style.display="none";
}

const displayNone = (displayNoneID) => {
    document.getElementById(displayNoneID).style.display="none";
}


const callAppendChild = (targetId) => { 
    const data = document.getElementById("addContents").value;
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
        document.getElementById("addContents").value = "";   

        li.addEventListener("mouseover", ()=>{span.style.display = "block";}, false)
        li.addEventListener("mouseout", ()=>{span.style.display = "none";}, false)
        span.addEventListener("click", ()=>{target.removeChild(li);}, false)
    }
}

// const createContainer = () => {

// }

// const createContainer = () => {
//     const targetWrap = document.getElementById("containerWrap"); 
//     const htmlTemplate = `<div class = "container">
//                             <ul id = "dataTarget">
//                                 <li class = "containSubject">${data}</li>
//                             </ul>
//                             <div class = "addDiv">
//                                 <div id = "openAdd">
//                                     <span class = "add icon-plus" onclick='display("addData", "openAdd")' >Add another card</span>
//                                 </div>
//                                 <div id = "addData">
//                                     <textarea class="addContents" id ="addContents" placeholder="Enter a title for this card..."></textarea>
//                                     <span class="inputAdd" id="inputAdd" onclick='display("openAdd", "addData"); callAppendChild("dataTarget")'>Add Card</span>
//                                     <span class="backButton icon-hamburger-menu-close" onclick='display("openAdd", "addData")'></span>
//                                 </div>
//                             </div>
//                         </div>`
    
//     targetWrap.innerHTML += htmlTemplate
// }

// const deleteData = () =>{
//     const targetParent = document.getElementById("dataTarget"); 
//     const deleteButton = document.getElementById("deleteData"); 
// }
// var ul = document.getElementById("yourElementId");
// ul.removeChild(ul.firstChild);