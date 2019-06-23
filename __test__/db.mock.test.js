const db = require('../__mocks__/db.mock');
const Todo = require('../model/todo');
const TodoList = require('../model/todolist');
const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');
const todoPath = path.join(dataDir, 'mocktodo');
const todoListPath = path.join(dataDir, 'mocktodolist');

let beforeTodos, beforeTodoLists, afterTodos, afterTodoLists;

describe('DB CRU 테스트', () => {
  it('읽기', async done => {
    const { todoSets, todoLists } = await db.read();
    expect(todoSets).toBeDefined();
    expect(todoLists).toBeDefined();
    beforeTodos = todoSets;
    beforeTodoLists = todoLists;
    done();
  });
  it('Todo 쓰기', async done => {
    expect(await db.create('todo', new Todo(4, '테스트 하는 중', 1, 'doing'))).toBeUndefined();
    done();
  });
  it('TodoList 쓰기', async done => {
    expect(await db.create('todolist', new TodoList(5, 'always', 3))).toBeUndefined();
    done();
  });
  it('Todo 수정하기', async done => {
    afterTodos = JSON.parse(JSON.stringify(beforeTodos));
    afterTodos['doing'][0].name = 'Mocha 배우기';
    expect(await db.update('todo', afterTodos)).toBeUndefined();
    done();
  });
  it('TodoList 수정하기', async done => {
    afterTodoLists = JSON.parse(JSON.stringify(beforeTodoLists));
    afterTodoLists[1].position = 2;
    afterTodoLists[2].position = 1;
    expect(await db.update('todolist', afterTodoLists)).toBeUndefined();
    done();
  });
  afterAll(async done => {
    const todoStringArray = (await fs.promises.readFile(todoPath, {encoding: 'utf-8'}) ).split('\n');
    todoStringArray.pop();
    await fs.promises.writeFile(todoPath ,todoStringArray.join('\n') + "\n", {encoding: 'utf-8'});

    const todoListStringArray = (await fs.promises.readFile(todoListPath, { encoding: 'utf-8'})).split('\n');
    todoListStringArray.pop();
    await fs.promises.writeFile(todoListPath ,todoListStringArray.join('\n') + "\n", {encoding: 'utf-8'});

    await db.update('todo', beforeTodos);
    await db.update('todolist', beforeTodoLists);
    done();
  });
});