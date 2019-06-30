const todoListManager = require('./todoList_manager');
const request   = require('supertest');
const server    = require('./server');

describe('TodoList Manager Test', () => {
    test('todoList parse', async () => {
        const todoList = JSON.parse(await todoListManager.readTodoList());
        console.log(todoList);
        console.log(todoList['hyodol92']);
        expect(Array.isArray(todoList['hyodol92'].todo)).toEqual(true);
        expect(Array.isArray(todoList['hyodol92'].doing)).toEqual(true);
        expect(Array.isArray(todoList['hyodol92'].done)).toEqual(true);
    });
});