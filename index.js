const addForm = `
    <div class="writing-item-box">
        <textarea placeholder="Enter a title for your new item"></textarea>
    </div>
    <div class="add-button-form">
        <button type="button" class="add-button">ADD</button>
        <a class="icon-hamburger-menu-close close" href="#" style="font-size: 30px; margin-left: 8px;" onclick="closeAddForm(event)"></a>
    </div>`;
const openAddFormLinks = document.getElementsByClassName('open-add-form-link');

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

function closeAddForm(event) {
    const addButtonFormNode = event.target.parentNode;
    const addFormNode = addButtonFormNode.parentNode;
    const listBoxNode = addFormNode.parentNode;
    const openAddFormLink = listBoxNode.getElementsByClassName('open-add-form-link')[0];
    listBoxNode.removeChild(addFormNode);
    openAddFormLink.style.display = 'inherit';
}