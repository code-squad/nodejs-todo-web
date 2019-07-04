const Router = require('../router');
const { isNotLoggedIn } = require('../middlewares/loginchecker');
const db = require('../../db');
const template = require('../../template');
const sessionManager = require('../../sessionmanager');
const Todo = require('../../model/todo');

const todoRouter = new Router();

todoRouter.get('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const { todos, todoLists } = await db.read(sessionManager.getUserId(req.sessionId));
    res.setHeader('Content-Type', 'text/html');
    res.write(template.makeIndexHtmlText(todoLists, todos));
    res.end();
  } catch (error) {
    next(error);
  }
});

todoRouter.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const userId = sessionManager.getUserId(req.sessionId);
    const { todos } = await db.read(userId);
    const newTodoId = (todos.length ? todos.slice(-1)[0].id : 0) + 1;
    const newTodo = new Todo(newTodoId, req.body.name, req.body.position, req.body.todolist );
    await db.create(userId, 'todo', newTodo);
    res.end(JSON.stringify({html: template.makeTodoHtmlText(newTodo)}));
  } catch (error) {
    next(error);
  }
});

todoRouter.put('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const todos = 
    req.body.map(todo => new Todo(todo.id, todo.name, todo.position, todo.todoListName))
            .sort((a, b) => a.id - b.id);
    await db.update(sessionManager.getUserId(req.sessionId), 'todo', todos);
    res.end();
  } catch (error) {
    next(error);
  }
});

todoRouter.delete('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const todos = req.body.map(todo => new Todo(todo.id, todo.name, todo.position, todo.todoListName))
                      .sort((a, b) => a.id - b.id);
    await db.update(sessionManager.getUserId(req.sessionId), 'todo', todos);
    res.end();
  } catch (error) {
    next(error);
  }
});

module.exports = todoRouter;