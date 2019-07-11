const fs = require('fs');

const indexController = (req, res, next) => {
  const { method, url } = req;
  console.log(`method : ${ method }, url: ${ url }`);
  let data = '';
  
  if (method === "GET" && url === "/") {
    res.statusCode = 200;
    data = fs.readFileSync(__dirname + '/../public/index.html');
    res.write(data);
    res.end();
    return;
  }
  if (method === "GET" && url === "/signIn") {
    res.statusCode = 200;
    data = fs.readFileSync(__dirname + '/../public/signIn.html');
    res.write(data);
    res.end();
    return;
  }
  next();
}



module.exports = indexController;