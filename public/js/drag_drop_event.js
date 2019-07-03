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
        const dataObject = this.handleDrop(event, storyDiv);
        if (dataObject !== undefined) this.send(dataObject);
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

    handleDrop(event, storyDiv) {
        const className = event.target.className;
        const element = this.getElement(event, className);

        if (element === undefined) return undefined;

        const data = { 
            delete : JSON.parse(storyDiv.id), 
            add : { type : parseInt(element.id) }
        };

        const storyDivParent = storyDiv.parentNode;

        if (className === 'todo_list_main') {
            data.add.index = this.getIndex(element.childNodes, event.pageY);
            element.childNodes.item(data.add.index).before(storyDiv);
        } else {
            data.add.index = element.childElementCount;
            element.appendChild(storyDiv);
        }

        if (data.delete.type !== data.add.type) this.setNumber(storyDivParent);
        this.setNumber(element, data.add.type);

        return data;
    }

    setNumber(object, type = undefined) {
        for (let index = 0; index < object.childElementCount; index++) {
            const tempObject = JSON.parse(object.childNodes.item(index).id);
            if (type !== undefined) tempObject.type = type;
            tempObject.index = index;
            object.childNodes.item(index).id = JSON.stringify(tempObject);
        }
    }

    send(data) {
        const type = ['todo', 'doing', 'done'];
        const body = JSON.stringify({ 
            deleteType  : type[data.delete.type], 
            deleteIndex : data.delete.index,
            addType     : type[data.add.type],   
            addIndex    : data.add.index
        });
        fetch('http://localhost:8888/update', { method : 'POST', body : body });
    }
}