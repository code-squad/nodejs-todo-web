const Middleware = class {
  constructor() {
    this.req;
    this.res;
    this.middlewareArr = [];
    this.targetMiddleware;
  }

  add(func) {
    this.middlewareArr.push(func);
  }

  run(req, res) {
    this.req = req;
    this.res = res;
    this.executeMiddleware(0, null);
  }

  isOverLength(index) {
    return index >= this.middlewareArr.length || index < 0;
  }

  handleErrorMiddleware(func, index, next, err) {
    if (func.length === 4) {
      func(err, this.req, this.res, next);
    }
    this.executeMiddleware(index + 1, err);
  }

  isUrlEqualsPath(targetMiddleware) {
    return this.req.url === targetMiddleware.path;
  }

  isMethodEqualsPath(targetMiddleware) {
    return this.req.method.toLowerCase() === targetMiddleware.method;
  }

  executeMiddleware(index, err) {
    if (this.isOverLength(index)) {
      return;
    }

    const targetMiddleware = this.middlewareArr[index];
    const next = (err) => this.executeMiddleware(index + 1, err);

    if (err) {
      this.handleErrorMiddleware(targetMiddleware, index, next, err);
      return;
    }

    if (targetMiddleware.path) {
      if (this.isUrlEqualsPath(targetMiddleware) && this.isMethodEqualsPath(targetMiddleware)) {
        targetMiddleware(this.req, this.res, next);
        return;
      }
      this.executeMiddleware(index + 1);
      return;
    }
    targetMiddleware(this.req, this.res, next);
  }
}

module.exports = Middleware;