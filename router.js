const routes = {
  "GET": {},
  "POST": {},
  "PUT": {},
  "PATCH": {},
  "DELETE": {},
};

exports.handle = (request, response) => {
  if(routes[request.method][request.url]){
    routes[request.method][request.url](request, response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}

exports.get = (url, action) => {
  routes["GET"][url] = action;
} 

exports.post = (url, action) => {
  routes["POST"][url] = action;
} 

exports.put = (url, action) => {
  routes["PUT"][url] = action;
} 

exports.delete = (url, action) => {
  routes["DELETE"][url] = action;
}