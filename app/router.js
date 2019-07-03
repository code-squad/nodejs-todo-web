const Middleware = require('./middleware');

class ErrorCatcher {
  constructor(){
    this.thrownError = null;
  }

  setError(err, req, res, next) {
    this.thrownError = err;
  }
}

class Router {
  constructor() {
    this.basePath = '/';
    this.routes = {
      "GET": {},
      "POST": {},
      "PUT": {},
      "DELETE": {},
    };
  }

  add(method, path, middlewares = []){
    const routerMiddleware = new Middleware();
    middlewares.forEach(middleware => routerMiddleware.add(middleware));
    this.routes[method][path] = routerMiddleware;
  }

  get(path, ...middlewares) {
    this.add("GET", path, middlewares);
  }

  post(path, ...middlewares) {
    this.add("POST", path, middlewares);
  }

  put(path, ...middlewares) {
    this.add("PUT", path, middlewares);
  }

  delete(path, ...middlewares) {
    this.add("DELETE", path, middlewares);
  }

  find(method, url){
    const routeUrl = url.replace(this.basePath, '') || '/';
    return this.routes[method][routeUrl];
  }

  lastRouterMiddleware(err, req, res, next) {
    req.next(err);
  }

  run(req, res, next) {
    const route = this.find(req.method, req.url);
    // const errorCatcher = new ErrorCatcher();
    if(req.url.split('/')[1] === this.basePath.split('/')[1] && route){
      req.next = next;
      const routerMiddlewares = route;

      // const boundSetError = errorCatcher.setError.bind(errorCatcher);
      // routerMiddlewares.add(boundSetError);
      routerMiddlewares.add(this.lastRouterMiddleware);
      routerMiddlewares.run(req, res);
    } else {
      next();
    }
  }
};

module.exports = Router;