const addForm = `
    <div class="writing-item-box">
        <textarea placeholder="Enter a title for your new item"></textarea>
    </div>
    <div class="add-button-form">
        <button type="button" class="add-button" onclick="addItemByAddButton(event)">ADD</button>
        <a class="icon-hamburger-menu-close close" href="#" style="font-size: 30px; margin-left: 8px;" onclick="closeAddForm(event)"></a>
    </div>`;
const openAddFormLinks = document.getElementsByClassName('open-add-form-link');
let draggingTarget = null;
const defaultItems = document.getElementsByClassName('default-item');
setItems();

for (defaultItem of defaultItems) {
    addDragEvent(defaultItem);
}
for (openAddFormLink of openAddFormLinks) {
    openAddFormLink.addEventListener('click', (event) => {
        const listBoxNode = event.target.parentNode;
        const addFormElement = document.createElement('div');
        addFormElement.setAttribute('class', 'add-form');
        addFormElement.innerHTML = addForm;
        listBoxNode.appendChild(addFormElement);
        event.target.style.display = 'none';
        const textArea = listBoxNode.getElementsByTagName('textarea')[0];
        textArea.focus();
    });
}

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', ()=> {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === xhr.DONE) {
            if(xhr.status === 200) {
                alert("로그아웃하였습니다.");
                window.location.href = '/';
            } else {
                console.error(xhr.responseText);
            }
        }
    }
    xhr.open('DELETE', '/auth');
    xhr.send();
});

function addItem(listArea, name, id) {
    const item = document.createElement('div');
    item.setAttribute('class', 'item');
    item.setAttribute('id', id);
    item.setAttribute('draggable', true);
    item.innerHTML = `${name}`;
    addDragEvent(item);
    addDeleteEvent(item);
    listArea.appendChild(item);
}

function closeAllAddForm(event) {
    if(event.target === document.body || event.target === document.querySelector('#list-box-wrapper')) {
        const addFormNodes = document.getElementsByClassName('add-form');
        let listBoxNode = undefined;
        let openAddFormLink = undefined;
        while (addFormNodes.length) {
            listBoxNode = addFormNodes[0].parentNode;
            openAddFormLink = listBoxNode.getElementsByClassName('open-add-form-link')[0];
            listBoxNode.removeChild(addFormNodes[0]);
            openAddFormLink.style.display = 'inherit';
        }
    }
}

function closeAddForm(event) {
    const addButtonFormNode = event.target.parentNode;
    const addFormNode = addButtonFormNode.parentNode;
    const listBoxNode = addFormNode.parentNode;
    const openAddFormLink = listBoxNode.getElementsByClassName('open-add-form-link')[0];
    listBoxNode.removeChild(addFormNode);
    openAddFormLink.style.display = 'inherit';
}

function addItemByAddButton(event) {
    const addButtonFormNode = event.target.parentNode;
    const addFormNode = addButtonFormNode.parentNode;
    const listBoxNode = addFormNode.parentNode;
    const listArea = listBoxNode.getElementsByClassName('list-area')[0];
    const textArea = addFormNode.getElementsByTagName('textarea')[0];
    const status = listArea.parentNode.id;
    const name = textArea.value;
    const item = {"name":name,"status":status};
    if (!(name === '')) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    const id = xhr.responseText;
                    addItem(listArea, name, id);
                    textArea.value = null;
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('POST', '/items');
        xhr.send(JSON.stringify(item));
    }
    textArea.focus();
}

function addDragEvent(item) {
    item.addEventListener('dragstart', function(event) {
        draggingTarget = event.target;
        event.dataTransfer.setData('text/html', draggingTarget);
    });

    item.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    item.addEventListener('dragenter', function(event) {
        event.target.style['border-bottom'] = 'solid 3px red';
    });

    item.addEventListener('dragleave', function(event) {
        event.target.style['border-bottom'] = '';
    });

    item.addEventListener('drop', (event) => {
        event.preventDefault();
        event.target.style['border-bottom'] = '';
        const listArea = event.target.parentNode;
        const status = listArea.parentNode.id;
        let siblingID = null;
        if(!(event.target.nextElementSibling === null)) {
            siblingID = event.target.nextElementSibling.id;
        }
        const targetID = draggingTarget.id;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    listArea.insertBefore(draggingTarget, event.target.nextElementSibling);
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('PATCH', '/items');
        xhr.send(JSON.stringify({ "targetID":targetID, "siblingID":siblingID, "status":status }));
    });
}

function addDeleteEvent(item) {
    item.addEventListener('dblclick', (event) => {
        const id = event.target.id;
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === xhr.DONE) {
                if(xhr.status === 200) {
                    event.target.parentNode.removeChild(event.target);
                } else {
                    console.error(xhr.responseText);
                }
            }
        }
        xhr.open('DELETE', `/items/?id=${id}`);
        xhr.send();
    });
}

function setItems() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === xhr.DONE) {
            if(xhr.status === 200) {
                const items = JSON.parse(xhr.responseText);
                for (item of items)  {
                    const listBoxNode = document.querySelector(`#${item.status}`);
                    const listArea = listBoxNode.querySelector('.list-area');
                    const itemDiv= document.createElement('div');
                    itemDiv.setAttribute('class', 'item');
                    itemDiv.setAttribute('id', item.id);
                    itemDiv.setAttribute('draggable', true);
                    itemDiv.innerHTML = `${item.name}`;
                    addDragEvent(itemDiv);
                    addDeleteEvent(itemDiv);
                    listArea.appendChild(itemDiv);
                }
            } else {
                console.error(xhr.responseText);
            }
        }
    }
    xhr.open('GET', '/items');
    xhr.send();
}