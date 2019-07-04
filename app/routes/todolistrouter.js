const Router = require('../router');
const { isNotLoggedIn } = require('../middlewares/loginchecker');
const template = require('../../template');
const db = require('../../db');
const TodoList = require('../../model/todolist');
const Todo = require('../../model/todo');
const sessionManager = require('../../sessionmanager');

const todolistRouter = new Router();

todolistRouter.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const userId = sessionManager.getUserId(req.sessionId);
    const { todoLists } = await db.read(userId);
    const newTodoListId = (todoLists.length ? todoLists.slice(-1)[0].id : 0 ) + 1;
    const newTodoList = new TodoList(newTodoListId, req.body.name, req.body.position );
    await db.create(userId, 'todolist', newTodoList);
    res.end(JSON.stringify({html: template.makeTodoListHtmlText(newTodoList, null)}));
  } catch (error) {
    next(error);
  }
});

todolistRouter.delete('/', isNotLoggedIn, async (req, res, next) => {
  try {
      const todos = req.body.todos.map(todo => new Todo(todo.id, todo.name, todo.position, todo.todoListName))
        .sort((a, b) => a.id - b.id);
      const todolists = req.body.todolists.map(todolist => new TodoList(todolist.id, todolist.name, todolist.position))
        .sort((a, b) => a.id - b.id);
      await db.update(sessionManager.getUserId(req.sessionId), 'todolist', todolists);
      await db.update(sessionManager.getUserId(req.sessionId), 'todo', todos);
      res.end();
  } catch (error) {
    next(error);
  }
});

module.exports = todolistRouter;