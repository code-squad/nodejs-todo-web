class AddEvent {
    constructor(todoListMainDiv, text, btn) {
        this.todoListMainDiv = todoListMainDiv;
        this.text = text;
        this.btn = btn;
    }

    makeStoryDiv(index) {
        const divStory = document.createElement('div');
        divStory.className = 'story';

        const inputButton = document.createElement('input');
        inputButton.setAttribute('type', 'button');
        inputButton.className = 'story_delete';
        inputButton.value = 'x';

        const br = document.createElement('br');
        const b = document.createElement('b');
        b.className = 'story_inner_text';
        b.innerText = this.text[index].value;

        divStory.append(inputButton);
        divStory.append(br);
        divStory.append(b);

        this.todoListMainDiv[index].appendChild(divStory);
    }

    click(index) {
        this.btn[index].addEventListener('click', () => { this.makeStoryDiv(index); });
    }
}