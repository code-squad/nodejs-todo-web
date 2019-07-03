const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');

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
    throw error;
  }
}

exports.read = async (userId) => {
  try{
    const todoLists = (await fs.promises.readFile(path.join(dataDir, userId, 'todolist'), 'utf-8'))
                          .split('\n')
                          .filter(line => line !== undefined && line !== '')
                          .map(line =>  new TodoList(...line.split(',')));

    const todos = (await fs.promises.readFile(path.join(dataDir, userId, 'todo'), 'utf-8'))
      .split('\n')
      .filter(line => line !== undefined && line !== '')
      .map(line => new Todo(...line.split(',')));

    return { todos, todoLists };
  } catch (error) { 
    throw error;
  }
};

exports.create = async (userId, type, data) => {
  try {
    await fs.promises.appendFile(path.join(dataDir, userId, type), serialize(data) + '\n');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.update = async (userId, type, arrayData) => {
  try {
    await fs.promises.writeFile(path.join(dataDir, userId, type),
                                arrayData.map(obj => serialize(obj)).join('\n') + '\n');
  } catch (error) {
    console.error(error);
    throw error;
  }
}

exports.isExistUser = async userId => {
  try {
    await fs.promises.access(path.join(dataDir, userId), fs.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

exports.makeUserFile = async (userId, password) => {
  try {
    await fs.promises.mkdir(path.join(dataDir, userId));
    await fs.promises.writeFile(path.join(dataDir, userId, 'account'), password, );
    await fs.promises.writeFile(path.join(dataDir, userId, 'todo'), '');
    await fs.promises.writeFile(path.join(dataDir, userId, 'todolist'), '');
  } catch (error) {
    throw error;
  }
}