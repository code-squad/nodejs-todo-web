const TodoListManager   = require('./manager/todoList_manager');
const MemberManager     = require('./manager/member_manager');
const request           = require('supertest');
const server            = require('./server');
const fs                = require('fs');

const todoListManager = new TodoListManager(fs);
const memberManager = new MemberManager(fs);

describe('TodoList Manager Test', () => {
    test('read member information test', async () => {
        const member = JSON.parse(await memberManager.readMemberInfo());
        expect(member['hyodol92']).toEqual('1234');
    });
    test('write member information test', async() => {
        const input = { id:'test12345678910', pw:'1234' };
        memberManager.writeMemberInfo(input);
    });
    test('todoList parse', async () => {
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        expect(Array.isArray(jsonData['hyodol'].todo)).toEqual(true);
        expect(Array.isArray(jsonData['hyodol'].doing)).toEqual(true);
        expect(Array.isArray(jsonData['hyodol'].todo)).toEqual(true);
    });
    test('init Test', async () => {        
        todoListManager.initTodoList(`devHyodol`);
    });
    test('Add Test 1', async () => {        
        const data = {type: 'todo', index: 0, value: '자료구조 공부하기'};
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData['devHyodol'];
        todoList[data.type].splice(data.index, 0, data.value);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
    });
    test('Add Test 2', async () => {        
        const data = {type: 'todo', index: 1, value: '알고리즘 공부하기'};
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData['devHyodol'];
        todoList[data.type].splice(data.index, 0, data.value);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
    });
    test('Add Test 3', async () => {        
        const data = {type: 'done', index: 0, value: '운동하기'};
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData['devHyodol'];
        todoList[data.type].splice(data.index, 0, data.value);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
    });
    test('Delete Test', async () => {
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData['devHyodol'];
        todoList['todo'].splice(0, 1);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
    });
    test('update Test 1', async () => {
        const data = { 
            deleteType  : 'todo', 
            deleteIndex : 0,
            addType     : 'todo',   
            addIndex    : 2,
        };
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData['hyodol92'];
        const [ addValue ] = todoList[data.deleteType].splice(data.deleteIndex, 1);
        if (data.deleteType === data.addType && data.deleteIndex < data.addIndex) data.addIndex--;
        todoList[data.addType].splice(data.addIndex, 0, addValue);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
    });
    test('update Test 2', async () => {
        const data = { 
            deleteType  : 'todo', 
            deleteIndex : 3,
            addType     : 'todo',   
            addIndex    : 0,
        };
        const jsonData = JSON.parse(await todoListManager.readTodoList());
        const todoList = jsonData['hyodol92'];
        const [ addValue ] = todoList[data.deleteType].splice(data.deleteIndex, 1);
        if (data.deleteType === data.addType && data.deleteIndex < data.addIndex) data.addIndex--;
        todoList[data.addType].splice(data.addIndex, 0, addValue);
        todoListManager.writeTodoList(JSON.stringify(jsonData));
    });
});