const Middleware = class {
  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.middlewareArr = [];
  }

  add(func) {
    this.middlewareArr.push(func);
  }

  run() {
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
    
    targetMiddleware(this.req, this.res, next);
  }
}

module.exports = Middleware;