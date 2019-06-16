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
            // Key : className of div tag
            // Value : element (node)
            'story'             : event.target,
            'todo_list_main'    : event.target.childNodes,
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

    getMidY(element) {
        return (this.getRectTop(element)+ this.getRectBottom(element)) / 2;
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

    handleDrop(event, object) {
        const className = event.target.className;
        const element = this.getElement(event, className);
        if (className === 'todo_list_main') {
            const index = this.getIndex(element, event.pageY);
            element.item(index).before(object);
        } else if (className === 'story') {
            const midY = this.getMidY(element);
            if (midY < event.pageY) element.after(object);
            else element.before(object);
        } else element.appendChild(object);
    }
}