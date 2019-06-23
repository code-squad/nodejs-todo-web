const Todo = require('../model/todo');
const TodoList = require('../model/todolist');

const { mockTodo, mockTodoList } = require('../__mocks__/todo.mock');

describe('객체 테스트', () => {
  it('TodoList 객체 값 할당 테스트', (done) => {
    const expectTodoList = {id: 3, name: 'doing', position: 1};

    expect(mockTodoList.id).toEqual(expectTodoList.id);
    expect(mockTodoList.name).toEqual(expectTodoList.name);
    expect(mockTodoList.position).toEqual(expectTodoList.position);
    expect(mockTodoList.todoList).toEqual(expectTodoList.todoList);

    done();
  });
  it('Todo 객체 값 할당 테스트', (done) => {
    const expectTodo = {id: 6, name: 'programming', position: 3, todoList: 'doing'};

    expect(mockTodo.id).toEqual(expectTodo.id);
    expect(mockTodo.name).toEqual(expectTodo.name);
    expect(mockTodo.position).toEqual(expectTodo.position);

    done();
  });
});