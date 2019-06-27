const fs = require('fs');
const path = require('path');
const dataDir = path.join(process.cwd(), 'data');

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

  return 'success';
})();