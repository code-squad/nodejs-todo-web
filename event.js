const getData = () => {
    let xhr = new XMLHttpRequest;
    let url = './getData'
    xhr.onreadystatechange = function(){
        if (this.status === 200 && this.readyState == this.DONE && xhr.responseText){
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

const sendClientData = (valueId) => {
    let xhr = new XMLHttpRequest();
    let dataArray = ["todo", [], "doing", [], "done",[]];
    let url = './sendData'
    let inputdata = document.getElementById(valueId).value;
    let dataMade = makeDataArray(dataArray, valueId, inputdata)
    dataMade = JSON.stringify(dataMade)
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(dataMade);
}

const deleteClientData = () => {
    let xhr = new XMLHttpRequest();
    let url = './deleteData'
    
    let deleteLi = document.getElementById("delete").parentNode;
    // let deleteLiIndex = Array.prototype.indexOf.call(deleteLi.parentNode.childNodes, deleteLi)-3;
    let deleteLiIndex = getLiIndex(deleteLi)
    let deleteUlID = deleteLi.parentNode.id;    
    let sendDataString = JSON.stringify([deleteUlID, deleteLiIndex])

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(sendDataString);

    deleteLi.parentNode.removeChild(deleteLi);
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

const getLiIndex = (li) => {
    // debugger
    let items = document.querySelectorAll("#"+ li.parentElement.id + " li."+li.className)
    let itemHTMLArray = []
    for(var i = 0; i < items.length; i++){
        itemHTMLArray.push(items[i].innerHTML);
    }
    console.log(itemHTMLArray.indexOf(li.innerHTML))
    return itemHTMLArray.indexOf(li.innerHTML)
}

const changeData = (beforeUlID, beforeLiIndex, afterInfo) => {
    let xhr = new XMLHttpRequest();
    let url = './changeData'

    let changedLi = afterInfo;
    // let changedLiIndex = Array.prototype.indexOf.call(changedLi.parentNode.childNodes, changedLi)-2;
    let changedLiIndex = getLiIndex(changedLi)
    console.log(changedLiIndex)
    
    let changedUlID = changedLi.parentNode.id;    
    changedLi.id = "dropLi"
    
    let changedLiValue = document.getElementById("dropLi").innerText
    let changedDataString = JSON.stringify([beforeUlID, beforeLiIndex, changedLiValue, changedLiIndex, changedUlID])
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(changedDataString);
    changedLi.id = ""
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
        li.id = String(Number(new Date()))
        li.appendChild(text); 
        li.appendChild(span); 
        span.classList.add("deleteData")
        span.classList.add("icon-hamburger-menu-close")
        targetUl.appendChild(li); 
        li.addEventListener("mouseover", ()=>{span.style.display = "block"; span.id = "delete"}, true)
        li.addEventListener("mouseout", ()=>{span.style.display = "none"; span.id = ""}, true)
        span.addEventListener("click", ()=>{deleteClientData()}, false)
        li.setAttribute('draggable', true); 
    }
}

