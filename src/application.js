const http = require("http");
const path = require("path");
const fs = require("fs");

const Application = () => {
  const server = http.createServer((req, res) => {
    const mimeType = {
      ".ico": "image/x-icon",
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".eot": "appliaction/vnd.ms-fontobject",
      ".ttf": "aplication/font-sfnt"
    };
    const ext = path.parse(req.url).ext;
    const publicPath = path.join(__dirname, "../public");

    if (Object.keys(mimeType).includes(ext)) {
      fs.readFile(`${publicPath}${req.url}`, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end("Not found");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", mimeType[ext]);
          res.end(data);
        }
      });
    }
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
