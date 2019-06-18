const Middleware = class {
  constructor() {
    this.middlewareArr = [];
  }

  add(func) {
    this.middlewareArr.push(func);
  }
}

module.exports = Middleware;