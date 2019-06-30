const fs = require('fs');

module.exports.initTodoList = async (id) => {
    console.time(`[ TodoList Mananger ] Init todoList `);
    const template = { 'id': id, 'contents' : { 'todo' : [], 'doing': [], 'done' : [] } };
    const writeData = JSON.stringify(template) + ',';
    const option = { encoding: 'utf-8', flag: 'a' };
    fs.appendFile('./todoList_Information.csv', writeData, option, (error) => {
        if (error) throw error;
        console.log("todoList is appended to file successfully.");
    });
    console.timeEnd(`[ TodoList Mananger ] Init todoList `);
}

