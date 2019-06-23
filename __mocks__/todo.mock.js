const TodoList = require('../model/todolist');
const Todo = require('../model/todo');

const mockTodoList = new TodoList(3, 'doing', 1);
const mockTodo = new Todo(6, 'programming', 3, mockTodoList.name);

module.exports = {
  mockTodo,
  mockTodoList,
};