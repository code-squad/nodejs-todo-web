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

exports.readUserPassword = async ({userId, password}) => {
  try {
    await fs.promises.access(path.join(dataDir, userId), fs.F_OK);
    const result = (await fs.promises.readFile(path.join(dataDir, userId, 'account'))).toString('utf-8');
    return result === password;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.read = async () => {
  const todoLists = (await fs.promises.readFile(todoListPath, 'utf-8'))
                      .split('\n')
                      .filter(line => line !== undefined && line !== '')
                      .map(line =>  new TodoList(...line.split(',')));

  const todos = (await fs.promises.readFile(todoPath, 'utf-8'))
    .split('\n')
    .filter(line => line !== undefined && line !== '')
    .map(line => new Todo(...line.split(',')));

  return { todos, todoLists };
};

exports.create = async (type, data) => {
  try {
    await fs.promises.appendFile((type === 'todolist' ? todoListPath : todoPath), serialize(data) + '\n');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.update = async (type, data) => {
  try {
    if(type === 'todo'){
      await fs.promises.writeFile(todoPath, data.map(todo => serialize(todo)).join('\n') + '\n');
    } else {
      await fs.promises.writeFile((type === 'todolist' ? todoListPath : todoPath), data.map(todoList => serialize(todoList)).join('\n') + '\n');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}