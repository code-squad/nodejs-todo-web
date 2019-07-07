const middleware = () => {
  const middleware = [];

  const add = func => {
    middleware.push(func);
  };

  return {
    middleware,
    add
  };
};

module.exports = middleware;
