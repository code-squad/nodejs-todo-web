const http = require('http');
const fs = require('fs');
const makeIndexHtmlText = require('./template');
const { getFileExtentsion, makeFilePath, getMimeType } = require('./util');
const db = require('./db');

const Todo = require('./model/todo');
const TodoList = require('./model/todolist');

let todos;
let todoLists;

const server = http.createServer(async (request, response) => {
  try {
    const result = await require('./db').read();
    todos = result.todos;
    todoLists = result.todoLists;
  } catch (error) {
    console.error(error);
    response.emit('error');
  }

  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
    response.statusCode = 503;
    response.end();
  });

  if (request.method === 'GET' && request.url === '/') {
    response.setHeader('Content-Type', 'text/html');
    response.write(makeIndexHtmlText(todoLists, todos));
    response.end();
  } else if (request.method === 'GET' && RegExp(/\/public/).test(request.url)) {
    response.setHeader('Content-Type', getMimeType(getFileExtentsion(request.url)));
    response.write(fs.readFileSync(makeFilePath(request.url)));
    response.end();
  } else if (request.method === 'POST' && RegExp(/\/todo$/).test(request.url)) {
    let body, todo;
    request.on('data', chunk => {
      body = JSON.parse(chunk.toString('utf-8'));
      todo = new Todo(todos.slice(-1)[0].id + 1, body.name, body.position, body.todolist );
      todos.push(todo);
      db.create('todo', todo);
    }).on('end', () => {
      response.end();
    });
  } else if (request.method === 'POST' && RegExp(/\/todolist$/).test(request.url)) {
    let body, todoList;
    request.on('data', chunk => {
      body = JSON.parse(chunk.toString('utf-8'));
      todoList = new TodoList(todoLists.slice(-1)[0].id + 1, body.name, body.position );
      todoLists.push(todoList);
      db.create('todolist', todoList);
    }).on('end', () => {
      response.end();
    });
  } else if (request.method === 'PUT' && RegExp(/\/todo$/).test(request.url)) {
    let body;
    request.on('data', chunk => {
      body = JSON.parse(chunk.toString('utf-8'));
      todos = body.map(todo => new Todo(todo.id, todo.name, todo.position, todo.todoListName)).sort((a, b) => a.id - b.id);
      db.update('todo', todos);
    }).on('end', () => {
      response.end();
    });
  } else if (request.url === '/data') {
    response.statusCode = 403;
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
});

module.exports = server;
