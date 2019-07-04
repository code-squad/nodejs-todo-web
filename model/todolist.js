class TodoList {
  constructor(id, name, position){
    this.id = parseInt(id);
    this.name = name;
    this.position = parseInt(position);
  }
}

module.exports = TodoList;