const todo_list_main_div = document.querySelectorAll('.todo_list_main');
const story_add_btn = document.querySelectorAll('.story_add');

// Add Event
story_add_btn[0].addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = 'story';
    todo_list_main_div[0].appendChild(div);
});

story_add_btn[1].addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = 'story';
    todo_list_main_div[1].appendChild(div);
});

story_add_btn[2].addEventListener('click', () => {
    const div = document.createElement('div');
    div.className = 'story';
    todo_list_main_div[2].appendChild(div);
});
