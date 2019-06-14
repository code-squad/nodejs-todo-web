const display = (displayClass, displayNoneClass) => {
    document.getElementById(displayClass).style.display="inherit";
    document.getElementById(displayNoneClass).style.display="none";
}


const callAppendChild = (targetId) => { 
    let data = document.getElementById("addContents").value;
    let text = document.createTextNode(data); 
    let target = document.getElementById(targetId); 
    let li = document.createElement('li'); 
    let span = document.createElement('span'); 
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
    }
}