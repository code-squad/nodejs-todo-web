const http = require("http");
const path = require("path");
const fs = require("fs");

const Application = () => {
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");

    const filePath = path.join(__dirname, "../public/index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  });

  const listen = (port = 3000, hostname = "127.0.0.1", fn) => {
    server.listen(port, hostname, fn);
  };

  return {
    server,
    listen
  };
};

module.exports = Application;
