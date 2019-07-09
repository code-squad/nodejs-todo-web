class DragDropEvent {
    dragOver(event) { 
        event.preventDefault();
        event.dataTransfer.dragEffect = 'move';
    }

    drag(event) { 
        event.dataTransfer.setData("text", event.target.id); 
    }

    drop(event) {
        event.preventDefault(); 
        const data = event.dataTransfer.getData("text");
        const storyDiv = document.getElementById(data);
        this.handleDrop(event, storyDiv);
    }

    getElement(event, className) {
        const element = {
            'todo_list_main'    : event.target,
            'todo_list'         : event.target.childNodes.item(3),
            'todo_list_title'   : event.target.nextElementSibling,
            'todo_list_input'   : event.target.previousElementSibling,
            'story_input'       : event.target.parentNode.previousElementSibling,
            'story_add'         : event.target.parentNode.previousElementSibling,
        };
        return element[className];
    }

    getRectTop(element) { 
        return element.getBoundingClientRect().top; 
    }

    getRectBottom(element) {
        return element.getBoundingClientRect().bottom;
    }

    getIndex(element, pageY) {
        const length = element.length;
        let start = 0, end = length - 1;
        while(start < end) {
            const mid = parseInt((start + end) / 2);
            const posY = this.getRectTop(element.item(mid));
            if (pageY >= posY) start = mid + 1;
            else end = mid;
        }
        return end;
    }

    setNumber(object, type = undefined) {
        for (let index = 0; index < object.childElementCount; index++) {
            const tempObject = JSON.parse(object.childNodes.item(index).id);
            if (type !== undefined) tempObject.type = type;
            tempObject.index = index;
            object.childNodes.item(index).id = JSON.stringify(tempObject);
        }
    }

    handleDrop(event, storyDiv) {
        const className = event.target.className;
        const element = this.getElement(event, className);

        if (element === undefined) return;

        let index = 0;
        let isTodoListMain = false;
        if (className === 'todo_list_main') {
            index = this.getIndex(element.childNodes, event.pageY);
            isTodoListMain = true;
        } else index = element.childElementCount;

        const data = { 
            delete : JSON.parse(storyDiv.id), 
            add : { type : parseInt(element.id), index : index }
        };

        const storyDivParent = storyDiv.parentNode;
        const type = ['todo', 'doing', 'done'];
        const body = JSON.stringify({ 
            deleteType  : type[data.delete.type], 
            deleteIndex : data.delete.index,
            addType     : type[data.add.type],   
            addIndex    : data.add.index
        });
        fetch('http://localhost:8888/updateTodo', { method : 'POST', redirect : 'follow', body : body })
        .then((response) => {
            switch (response.status) {
                case 200 : 
                    if (isTodoListMain) element.childNodes.item(data.add.index).before(storyDiv);
                    else element.appendChild(storyDiv);
                    if (data.delete.type !== data.add.type) this.setNumber(storyDivParent);
                    this.setNumber(element, data.add.type);
                    break;
                case 302 : window.location.href = '/signIn?';           break;
                default  : alert(`HTTP status : ${response.status}`);   break;
            }
        });
    }
}