const todoListManager = require('./todoList_manager');
const request   = require('supertest');
const server    = require('./server');

describe('TodoList Manager Test', () => {
    test('todoList parse', async () => {
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        console.log(jsonData);
        console.log(jsonData['hyodol92']);
        const data = { id : 'hyodol92', contents : jsonData['hyodol92'] };
        console.log(data.contents);
        expect(Array.isArray(jsonData['hyodol92'].todo)).toEqual(true);
        expect(Array.isArray(jsonData['hyodol92'].doing)).toEqual(true);
        expect(Array.isArray(jsonData['hyodol92'].todo)).toEqual(true);
    });
    test('add Test', async () => {
        const data = {type: 'todo', index: '2', value: '네트워크 공부하기'};
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData['hyodol92'];
        console.log(todoList[data.type]);
        todoList[data.type].splice(parseInt(data.index), 0, data.value);
        console.log(todoList[data.type]);
    });
});