const fs = require('fs');

module.exports.initTodoList = async (id) => {
    console.time(`[ TodoList Mananger ] Init todoList `);
    const writeData = `"${id}":{"todo":[],"doing":[],"done":[]},`;
    const option = { encoding: 'utf-8', flag: 'a' };
    fs.appendFile('./db/todoList_Information.csv', writeData, option, (error) => {
        if (error) throw error;
    });
    console.timeEnd(`[ TodoList Mananger ] Init todoList `);
}

module.exports.writeTodoList = async (todoList) => {
    console.time(`[ TodoList Mananger ] write todoList `);
    const option = { encoding: 'utf-8', flag: 'w' };
    todoList = todoList.substr(1, todoList.length - 2) + ",";
    fs.writeFile('./db/todoList_Information.csv', todoList, option, (error) => {
        if (error) throw error;
    });
    console.timeEnd(`[ TodoList Mananger ] write todoList `);
}

module.exports.readTodoList = () => {
    return new Promise((resolve) => {
        console.time(`[ TodoList Mananger ] Read TodoList `);
        fs.readFile('./db/todoList_Information.csv', 'utf-8', (error, data) => {
            if (error) throw error;
            resolve(`{${data.substr(0, data.length - 1)}}`);
        });
        console.timeEnd(`[ TodoList Mananger ] Read TodoList `);
    });
}

