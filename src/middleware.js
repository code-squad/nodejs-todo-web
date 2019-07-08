const Middleware = () => {
  const middlewares = [];
  let request = null;
  let response = null;

  const middlewareRun = (i, err) => {
    if (i < 0 || i >= middlewares.length) return;

    const nextMiddleware = middlewares[i];
    const next = err => middlewareRun(i + 1, err);

    nextMiddleware(request, response, next);
  };

  const add = func => {
    middlewares.push(func);
  };

  const run = (req, res) => {
    request = req;
    response = res;
    middlewareRun(0, null);
  };

  return {
    middlewares,
    add,
    run
  };
};

module.exports = Middleware;
