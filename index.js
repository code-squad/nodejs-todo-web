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

for (openAddFormLink of openAddFormLinks) {
    openAddFormLink.addEventListener('click', (event) => {
        const listBoxNode = event.target.parentNode;
        const addFormElement = document.createElement('div');
        addFormElement.setAttribute('class', 'add-form');
        addFormElement.innerHTML = addForm;
        listBoxNode.appendChild(addFormElement);
        event.target.style.display = 'none';
    });
}

function generateRandomId() {
    return Date.now();
}

function closeAddForm(event) {
    const addButtonFormNode = event.target.parentNode;
    const addFormNode = addButtonFormNode.parentNode;
    const listBoxNode = addFormNode.parentNode;
    const openAddFormLink = listBoxNode.getElementsByClassName('open-add-form-link')[0];
    listBoxNode.removeChild(addFormNode);
    openAddFormLink.style.display = 'inherit';
}

function addItem(parentNode, name) {
    const item = document.createElement('div');
    item.setAttribute('class', 'item');
    item.setAttribute('id', generateRandomId());
    item.setAttribute('draggable', true);
    item.innerHTML = `${name}`;
    addDragEvent(item);
    parentNode.appendChild(item);
}

function addItemByAddButton(event) {
    const addButtonFormNode = event.target.parentNode;
    const addFormNode = addButtonFormNode.parentNode;
    const listBoxNode = addFormNode.parentNode;
    const listArea = listBoxNode.getElementsByClassName('list-area')[0];
    const textarea = addFormNode.getElementsByTagName('textarea')[0];
    const name = textarea.value;
    if (!(name === '')) {
        addItem(listArea, name);
        textarea.value = null;
    }
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
        event.target.parentNode.insertBefore(draggingTarget, event.target.nextElementSibling);
    });
}