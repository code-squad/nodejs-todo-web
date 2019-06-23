const TodoList = require('../model/todolist');
const Todo = require('../model/todo');


const mockTodoLists = [
  new TodoList(1, 'todo', 0),
  new TodoList(2, 'doing', 1),
  new TodoList(3, 'done', 2),
];

const mockTodos = {
  todo: [new Todo(2, '자소서 쓰기', 0, mockTodoLists[0].name),
  new Todo(3, '스프링 배우기', 1, mockTodoLists[0].name),],
  doing: [new Todo(1, 'Jest 배우기', 0, mockTodoLists[1].name),],
  done: [new Todo(4, 'Todo frontend 만들기', 0, mockTodoLists[2].name), ],
};

const mockHtml = `<!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="public/index.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="public/materialize.min.css" media="screen" />
    <title>TODO</title>
  </head>
  <body>
    <div class="surface">
      <div class="header white-text grey darken-3">
        Todo
      </div>
      <div class="shadow-header deep-orange-text">
          This element wiil not shown.
      </div>
      <div id="stage">
        <div class="todo-column todolist-container grey lighten-2">
<div class="todolist-header">
  todo
</div>
<ul class="collection">
  <li class="collection-item todo-item" draggable="true"><div>자소서 쓰기</div></li>
<li class="collection-item todo-item" draggable="true"><div>스프링 배우기</div></li>
</ul>
<div class="todolist-footer">
  <button class="add-card">Add card</button>
  <div class="add-card-form hide-element">
    <input class="input-field new-card-name" placeholder="Input new card name">
  </div>
</div>
</div>
<div class="todo-column todolist-container grey lighten-2">
<div class="todolist-header">
  doing
</div>
<ul class="collection">
  <li class="collection-item todo-item" draggable="true"><div>Jest 배우기</div></li>
</ul>
<div class="todolist-footer">
  <button class="add-card">Add card</button>
  <div class="add-card-form hide-element">
    <input class="input-field new-card-name" placeholder="Input new card name">
  </div>
</div>
</div>
<div class="todo-column todolist-container grey lighten-2">
<div class="todolist-header">
  done
</div>
<ul class="collection">
  <li class="collection-item todo-item" draggable="true"><div>Todo frontend 만들기</div></li>
</ul>
<div class="todolist-footer">
  <button class="add-card">Add card</button>
  <div class="add-card-form hide-element">
    <input class="input-field new-card-name" placeholder="Input new card name">
  </div>
</div>
</div>
        <div class="todo-container">

          <div class="todo-column">
            <button id="add-todo-btn" class="btn-large grey">Add list</button>
            <div class="add-list-form hide-element">
              <input type="text" class="input-field new-list-name" placeholder="Input new todolist name">
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="background"></div>
  </body>
  <script src="public/index.js"></script>
  </html>`;

module.exports = { mockTodoLists, mockTodos, mockHtml };