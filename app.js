const http = require('http');
const fs = require('fs');
const makeIndexHtmlText = require('./template');
const { getFileExtentsion, makeFilePath, getMimeType, generateSessionId, parseCookie } = require('./util');
const db = require('./db');
const router = require('./router');
const sessionManager = require('./sessionmanager');

const Todo = require('./model/todo');
const TodoList = require('./model/todolist');

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

  if (request.method === 'GET' && RegExp(/\/public/).test(request.url)) {
    response.setHeader('Content-Type', getMimeType(getFileExtentsion(request.url)));
    const content = await fs.promises.readFile(makeFilePath(request.url));
    response.end(content);
  } else if (RegExp(/\/data.*/).test(request.url)) {
    response.statusCode = 403;
    response.end();
  } else {
    router.handle(request, response);
  }
});

router.get('/', async (request, response) => {
  const cookies = parseCookie(request.headers.cookie);
  if(cookies && sessionManager.isValidSession(cookies.token)) {
    response.statusCode = 302;
    response.setHeader('location', '/todo');
    response.end();
  } else {
    try {
      const content = await fs.promises.readFile(makeFilePath('/public/login.html'));
      response.setHeader('Content-Type', 'text/html');
      if(cookies) {
        response.setHeader('Set-Cookie', [`token=${cookies.token}; Max-Age=0; HttpOnly`]);
      }
      response.end(content);
    } catch (error) {
      console.error(error);
      response.statusCode = 500;
      response.end();
    }
  }
});

router.post('/login', (request, response) => {
  request.on('data', async chunk => {
    try {
      // const body = chunk.toString('utf-8').trim().split('&').reduce((acc, query) => {
      //   const devideByEqual = query.split('=');
      //   acc[devideByEqual[0]] = devideByEqual[1];
      //   return acc;
      // }, {});
      const body = JSON.parse(chunk.toString('utf-8'));
      const loginResult = await db.readUserPassword(body);
      if(loginResult){
        const sessionId = generateSessionId(body.userId), maxAge = sessionManager.getMaxAge();
        sessionManager.setSession(sessionId, body.userId, new Date());
        response.setHeader('Set-Cookie', [`token=${sessionId}; Max-Age=${maxAge}; HttpOnly`]);
        response.statusCode = 302;
        response.setHeader('location', '/todo');
        response.end();
      } else {
        response.statusCode = 403;
        response.end();
      }
    } catch (error) {
      response.statusCode = (error.errno === -2 ? 403 : 500);
      response.end();      
    }
  });
});

router.get('/todo', async (request, response) => {
  const cookies = parseCookie(request.headers.cookie);
  try {
    if(cookies && sessionManager.isValidSession(cookies.token)) {
      const { todos, todoLists } = await db.read();
      response.setHeader('Content-Type', 'text/html');
      response.write(makeIndexHtmlText(todoLists, todos));
      response.end();
    } else {
      response.statusCode = 302;
      response.setHeader('location', '/');
      if(cookies) {
        response.setHeader('Set-Cookie', [`token=${cookies.token}; Max-Age=0; HttpOnly`]);
      }
      response.end();
    }
  } catch (error) {
    response.statusCode = 500;
    response.end();
  }
});

router.post('/todo', (request, response) => {
  request.on('data', async chunk => {
    try {
      const body = JSON.parse(chunk.toString('utf-8'));
      const { todos } = await db.read();
      const todo = new Todo(todos.slice(-1)[0].id + 1, body.name, body.position, body.todolist );
      await db.create('todo', todo);
      response.end();
    } catch (error) {
      response.statusCode = 500;
      response.end();
    }
  });
});

router.post('/todolist', (request, response) => {
  request.on('data', async chunk => {
    try {
      const body = JSON.parse(chunk.toString('utf-8'));
      const { todoLists } = await db.read();
      const todoList = new TodoList(todoLists.slice(-1)[0].id + 1, body.name, body.position );
      await db.create('todolist', todoList);
      response.end();
    } catch (error) {
      response.statusCode = 503;
      response.end();
    }
  });
});

router.put('/todo', (request, response) => {
  request.on('data', async chunk => {
    try {
      const body = JSON.parse(chunk.toString('utf-8'));
      const todos = body.map(todo => new Todo(todo.id, todo.name, todo.position, todo.todoListName)).sort((a, b) => a.id - b.id);
      await db.update('todo', todos);
      response.end();
    } catch (error) {
      console.log(error);
      response.statusCode = 500;
      response.end();
    }
  });
});

module.exports = server;