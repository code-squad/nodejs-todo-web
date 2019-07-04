const server = require('./app');
const port = process.env.PORT || 8080;
const fs = require('fs');
const path = require('path');

(async () => {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.promises.access((dataDir), fs.F_OK);
  } catch (error) {
    if(error.errno === -2) {
      await fs.promises.mkdir(path.join(dataDir));
    } else {
      console.error('Fatal Error: Cannot access Database directory');
      process.exit(1);
    }
  }
})();

server.listen(port, () => {
  console.log(`Listen in ${port}`);
});