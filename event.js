const getData = () => {
    let xhr = new XMLHttpRequest;
    let url = './getData'
    xhr.onreadystatechange = function(){
        if (this.status === 200 && this.readyState == this.DONE){
            let todoListData = JSON.parse(xhr.responseText);
            let todoArr = todoListData[1]
            let doingArr = todoListData[3]
            let doneArr = todoListData[5]

            todoArr.forEach((data)=>{makeChild("dataTarget_todo", data)})
            doingArr.forEach((data)=>{makeChild("dataTarget_doing", data)})
            doneArr.forEach((data)=>{makeChild("dataTarget_done", data)})
        }
    }
    xhr.open('GET', url, true)
    xhr.send();
}


const sendData = (valueId) => {
    let inputdata = document.getElementById(valueId).value;
    sendAjax('./sendData', valueId, inputdata)
}


const sendAjax = (url, dataId, data) => {
    let xhr = new XMLHttpRequest();
    let dataMade = makeDataArray(dataArray, dataId, data)
    dataMade = JSON.stringify(dataMade)
  
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(dataMade);
}

const makeDataArray = (dataArray, dataId, data) => {
    if(dataId === "dataTodo"){
        dataArray[1].push(data)
    }else if(dataId === "dataDoing"){
        dataArray[3].push(data)
    }else if(dataId === "dataDone"){
        dataArray[5].push(data)
    }
    return dataArray
}


const display = (displayID, displayNoneID) => {
    document.getElementById(displayID).style.display="inherit";
    document.getElementById(displayNoneID).style.display="none";
}

const makeChild = (targetId, value) => {
    let text = document.createTextNode(value); 
    let targetUl = document.getElementById(targetId); 
    let li = document.createElement('li'); 
    let span = document.createElement('span'); 

    if(value !== ""){
        li.classList.add("contents")
        li.appendChild(text); 
        li.appendChild(span); 
        span.classList.add("deleteData")
        span.classList.add("icon-hamburger-menu-close")
        targetUl.appendChild(li); 
        li.addEventListener("mouseover", ()=>{span.style.display = "block";}, true)
        li.addEventListener("mouseout", ()=>{span.style.display = "none";}, true)
        span.addEventListener("click", (ev)=>{ev.target.parentNode.parentNode.removeChild(ev.target.parentNode);}, false)

        drag(targetUl,li)
    }
}

const callAppendChild = (targetId, valueId) => { 
    let data = document.getElementById(valueId).value;
    let text = document.createTextNode(data); 
    let targetUl = document.getElementById(targetId); 
    let li = document.createElement('li'); 
    let span = document.createElement('span'); 

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
