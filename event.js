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
    let dragging = null;

    if(data !== ""){
        li.classList.add("contents")
        // li.id = "contents"
        li.appendChild(text); 
        li.appendChild(span); 
        span.classList.add("deleteData")
        span.classList.add("icon-hamburger-menu-close")
        target.appendChild(li); 
        document.getElementById(valueId).value = "";   
        
        li.setAttribute('draggable', true); 
        li.setAttribute('ondragstart', "drag(event)"); 


        document.addEventListener('dragstart', (event) => { 
            dragging = event.target;
            event.dataTransfer.setData('text/html', dragging);
        });

        document.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        target.addEventListener('dragenter', (event) => {
            event.target.style['border-bottom'] = 'solid 2px blue';
        });

        target.addEventListener('dragleave', (event) => {
            event.target.style['border-bottom'] = '';
        });

        target.addEventListener('drop', (event) => {
            event.preventDefault();
            event.target.style['border-bottom'] = '';
            event.target.parentNode.insertBefore(dragging, event.target.nextSibling);
        });

        li.addEventListener("mouseover", ()=>{span.style.display = "block";}, false)
        li.addEventListener("mouseout", ()=>{span.style.display = "none";}, false)
        span.addEventListener("click", ()=>{target.removeChild(li);}, false)
    }
}
// const allowDrop = (ev) => {
//     ev.preventDefault();
// }

// const drag = (ev) => {
//     ev.dataTransfer.setData("text/html", ev.target);
// }

// const drop = (ev) => {
//     ev.preventDefault();
//     const data = ev.dataTransfer.getData("text/html");
//     // alert()
//     // document.getElementById(data).nextSibling.innerHTML
//     ev.target.parentNode.insertBefore(data,ev.target.nextSibling);
//     // ev.target.style.border = "1px solid red"
//     // ev.target.style.border = "none"
// }
