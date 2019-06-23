class Todo {
  constructor(id, name, position, todoListName) {
    this.id = parseInt(id);
    this.name = name;
    this.position = parseInt(position);
    this.todoListName = todoListName;
  }
}

module.exports = Todo;