function makeTodoHtmlText(todo) {
  return `<li class="collection-item todo-item" draggable="true" data-id="${todo.id}"><div>${todo.name}</div></li>`
}

function makeTodoListHtmlText(todoList, todos) { 
  const todosHtml = todos.map(todo => makeTodoHtmlText(todo)).join('\n');
  return `<div class="todo-column todolist-container grey lighten-2">
<div class="todolist-header">
  ${todoList}
</div>
<ul class="collection">
  ${todosHtml}
</ul>
<div class="todolist-footer">
  <button class="add-card">Add card</button>
  <div class="add-card-form hide-element">
    <input class="input-field new-card-name" placeholder="Input new card name">
  </div>
</div>
</div>`;
}

function makeIndexHtmlText(todoLists, todos) {
  const todoSets = todoLists.reduce((acc, todoList) => {
    acc[todoList.name] = [];
    return acc;
  },{});
  todos.forEach(todo => todoSets[todo.todoListName].push(todo));
  for (const key in todoSets) {
    todoSets[key].sort((a, b) => a.position - b.position);
  }
  const todoListsHtmlText = todoLists.map(todoList => makeTodoListHtmlText(todoList.name, todoSets[todoList.name])).join('\n');
  return `<!DOCTYPE html>
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
    <form id="logout-form" action="/logout" method="post">
      <button type="submit" id="logout-btn" class='col s6 btn waves-effect grey'>로그아웃</button>
    </form
    <div class="surface">
      <div class="header white-text grey darken-3">
        Todo
      </div>
      <div class="shadow-header deep-orange-text">
          This element wiil not shown.
      </div>
      <div id="stage">
        <div class="todo-container">
          ${todoListsHtmlText}
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
  </html>`
}

module.exports = makeIndexHtmlText;
