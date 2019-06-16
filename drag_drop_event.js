class DragDropEvent {
    dragOver(ev) { 
        ev.preventDefault();
        ev.dataTransfer.dragEffect = 'move';
    }

    drag(ev) { 
        ev.dataTransfer.setData("text", ev.target.id); 
    }

    drop(ev) {
        const target = {
            'todo_list_main'    : ev.target,
            'story'             : ev.target.parentNode,
            'todo_list'         : ev.target.childNodes[3],
            'todo_list_title'   : ev.target.nextElementSibling,
            'todo_list_input'   : ev.target.previousElementSibling,
            'story_input'       : ev.target.parentNode.previousElementSibling,
            'story_add'         : ev.target.parentNode.previousElementSibling,
        }

        ev.preventDefault(); 
        const data = ev.dataTransfer.getData("text");
        const storyDiv = document.getElementById(data);
        target[ev.target.className].appendChild(storyDiv);
    }
}