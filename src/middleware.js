const middleware = () => {
  const middleware = [];

  const middlewareRun = (i, err) => {
    if (i < 0 || i >= middlewares.length) return;

    const nextMiddleWare = middlewares[i];
    const next = err => run(i + 1, err);

    nextMiddleWare(req, res, next);
  };

  const add = func => {
    middleware.push(func);
  };

  const run = (req, res) => {
    const req = req;
    const res = res;
    middlewareRun(0, null);
  };

  return {
    middleware,
    add,
    run
  };
};

module.exports = middleware;
