const todoListManager = require('./todoList_manager');
const request   = require('supertest');
const server    = require('./server');

describe('TodoList Manager Test', () => {
    test('todoList parse', async () => {
        const todoList = JSON.parse(await todoListManager.readTodoList());
        console.log(todoList);
        expect(Array.isArray(todoList)).toEqual(true);
        todoList.forEach((element) => {
            if (element.id === 'hyodol') {
                console.log(element.contents);
                expect(Array.isArray(element.contents.todo)).toEqual(true);
            }
        });
    });
});