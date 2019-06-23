const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');
const todoPath = path.join(dataDir, 'todo');
const todoListPath = path.join(dataDir, 'todolist');

function fileExist(path) {
  try {
    fs.accessSync(path, fs.F_OK);
    return true;
  } catch(err) {
    return false;
  }
}

module.exports = (function(){
  if(!fileExist(dataDir)){
    fs.mkdirSync(dataDir);
  }

  if(!fileExist(todoListPath)){
    fs.writeFileSync(todoListPath, '');
  }

  if(!fileExist(todoPath)){
    fs.writeFileSync(todoPath, '');
  }

  return 'success';
})();