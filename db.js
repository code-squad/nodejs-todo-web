const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');
const todoPath = path.join(dataDir, 'todo');
const todoListPath = path.join(dataDir, 'todolist');

const TodoList = require('./model/todolist');
const Todo = require('./model/todo');

function serialize(object) {
  return Object.values(object).join(',');
}

exports.read = async () => {
  const todoSets = {};
  const todoLists = (await fs.promises.readFile(todoListPath, 'utf-8'))
                      .split('\n')
                      .filter(line => line !== undefined && line !== '')
                      .map(line =>  new TodoList(...line.split(',')));

  todoLists.forEach(todoList => todoSets[todoList.name] = []);

  (await fs.promises.readFile(todoPath, 'utf-8'))
    .split('\n')
    .filter(line => line !== undefined && line !== '')
    .forEach(line => {
      const todo = new Todo(...line.split(','));
      todoSets[todo.todoListName].push(todo);
    });

    return { todoSets, todoLists };
};

exports.create = async (type, data) => {
  try {
    await fs.promises.appendFile((type === 'todolist' ? todoListPath : todoPath), serialize(data));
  } catch (error) {
    console.error(error);
    return error;
  }
}

exports.update = async (type, data) => {
  try {
    if(type === 'todo'){
      const arrayTodo = [];
      for (const key in data) {
        data[key].forEach(todo => arrayTodo.push(todo));
      }
      await fs.promises.writeFile(todoPath, arrayTodo.map(todo => serialize(todo)).join('\n') + '\n');
    } else {
      await fs.promises.writeFile((type === 'todolist' ? todoListPath : todoPath), data.map(todoList => serialize(todoList)).join('\n') + '\n');
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}