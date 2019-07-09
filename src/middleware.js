const Middleware = () => {
  const middlewares = [];
  let request;
  let response;

  const middlewareRun = (i, err) => {
    if (i < 0 || i >= middlewares.length) return;

    const nextMiddleware = middlewares[i];
    const next = err => middlewareRun(i + 1, err);

    if (err) {
      const isNextErrorMiddleware = nextMiddleware.length === 4;
      return isNextErrorMiddleware
        ? nextMiddleware(err, request, response, next)
        : middlewareRun(i + 1, err);
    }
    if (nextMiddleware.path) {
      const pathMatched = request.url === nextMiddleware.path;
      return pathMatched
        ? nextMiddleware(request, response, next)
        : middlewareRun(i + 1);
    }
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
