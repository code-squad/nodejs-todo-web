const todoListMainDiv = document.querySelectorAll('.todo_list_main');

// Add Event
const storyInputText = document.querySelectorAll('.story_input');
const storyAddBtn = document.querySelectorAll('.story_add');
const addEvent = new AddEvent(todoListMainDiv, storyInputText, storyAddBtn);
for (let i = 0; i < addEvent.btn.length; i++) addEvent.click(i);