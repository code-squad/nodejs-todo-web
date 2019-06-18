const Middleware = class {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.middlewareArr = [];
  }

  add(func) {
    this.middlewareArr.push(func);
  }

  run(req, res) {
    this.req = req;
    this.res = res;

    this.middlewareRun(0);
  }

  isOverLength(index) {
    return index >= this.middlewareArr.length || index < 0;
  }

  isErrorMiddleware(func, index, err) {
    if (func.length === 4) {
      func(this.req, this.res, next, err);
    } else {
      this.middlewareRun(index + 1, err);
    }
  }

  middlewareRun(index, err) {
    if (this.isOverLength(index)) {
      return;
    }

    const targetFunc = this.middlewareArr[index];
    const next = (err) => this.middlewareRun(index + 1, err);

    if (err) {
      this.isErrorMiddleware(targetFunc, index, err);
    }

    targetFunc(this.req, this.res, next);
  }
}

module.exports = Middleware;