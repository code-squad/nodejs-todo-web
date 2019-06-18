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

  middlewareRun(index) {
    if (this.isOverLength(index)) {
      return;
    }

    const targetFuc = this.middlewareArr[index];
    const next = () => this.middlewareRun(index + 1);
    targetFuc(this.req, this.res, next);
  }
}

module.exports = Middleware;