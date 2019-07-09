const http = require("http");
const Middleware = require("./middleware");

const Application = () => {
  const middleware = Middleware();
  const server = http.createServer((req, res) => {
    middleware.run(req, res);
  });
  const use = (path, func) => {
    if (typeof path === "string" && typeof func === "function") {
      func.path = path;
    } else if (typeof path === "function") {
      func = path;
    } else {
      throw Error("잘못된 use 함수 입니다.");
    }

    middleware.add(func);
  };

  const listen = (port = 3000, hostname = "127.0.0.1", func) => {
    server.listen(port, hostname, func);
  };

  return {
    server,
    use,
    listen
  };
};

module.exports = Application;
