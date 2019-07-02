const display = (displayID, displayNoneID) => {
    document.getElementById(displayID).style.display="inherit";
    document.getElementById(displayNoneID).style.display="none";
}

const callAppendChild = (targetId, valueId) => { 
    const data = document.getElementById(valueId).value;
    const text = document.createTextNode(data); 
    const targetUl = document.getElementById(targetId); 
    const li = document.createElement('li'); 
    const span = document.createElement('span'); 

    if(data !== ""){
        li.classList.add("contents")
        li.appendChild(text); 
        li.appendChild(span); 
        span.classList.add("deleteData")
        span.classList.add("icon-hamburger-menu-close")
        targetUl.appendChild(li); 
        document.getElementById(valueId).value = "";   
        li.addEventListener("mouseover", ()=>{span.style.display = "block";}, false)
        li.addEventListener("mouseout", ()=>{span.style.display = "none";}, false)
        span.addEventListener("click", (ev)=>{ev.target.parentNode.parentNode.removeChild(ev.target.parentNode);}, false)

        drag(targetUl,li)
    }
}

const drag = (listWrap, list) => {
    let dragging = null;
    list.setAttribute('draggable', true); 
    document.addEventListener('dragstart', (event) => { 
        dragging = event.target;
        event.dataTransfer.setData('text/html', dragging);
    });

    document.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    listWrap.addEventListener('dragenter', (event) => {
        event.target.style['border-bottom'] = 'solid 2px blue';
    });

    listWrap.addEventListener('dragleave', (event) => {
        event.target.style['border-bottom'] = '';
    });

    listWrap.addEventListener('drop', (event) => {
        event.preventDefault();
        event.target.style['border-bottom'] = '';
        event.target.parentNode.insertBefore(dragging, event.target.nextSibling);
    });
}


// const form = document.querySelector('form');
// console.log(form);
// form.delete("email");
// form.delete("pwd");
//form.reset();
