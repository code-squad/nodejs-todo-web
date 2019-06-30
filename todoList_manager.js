const fs = require('fs');

module.exports.initTodoList = async (id) => {
    console.time(`[ TodoList Mananger ] Init todoList `);
    const template = { 'id': id, 'contents' : { 'todo' : [], 'doing': [], 'done' : [] } };
    const writeData = JSON.stringify(template) + '$';
    console.timeEnd(`[ TodoList Mananger ] Init todoList `);
}

