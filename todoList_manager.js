const fs = require('fs');

module.exports.initTodoList = async (id) => {
    console.time(`[ TodoList Mananger ] Init todoList `);
    const writeData = `"${id}":{"todo":[],"doing":[],"done":[]},`;
    const option = { encoding: 'utf-8', flag: 'a' };
    fs.appendFile('./todoList_Information.csv', writeData, option, (error) => {
        if (error) throw error;
        console.log("todoList is appended to file successfully.");
    });
    console.timeEnd(`[ TodoList Mananger ] Init todoList `);
}

module.exports.readTodoList = () => {
    return new Promise((resolve) => {
        console.time(`[ TodoList Mananger ] Read TodoList `);
        fs.readFile('./todoList_Information.csv', 'utf-8', (error, data) => {
            if (error) throw error;
            resolve(`{${data.substr(0, data.length - 1)}}`);
        });
        console.timeEnd(`[ TodoList Mananger ] Read TodoList `);
    });
}

