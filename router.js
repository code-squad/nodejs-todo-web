const routes = {
  "GET": {},
  "POST": {},
  "PUT": {},
  "PATCH": {},
  "DELETE": {},
};

exports.handle = (request, response) => {
  try {
    if(routes[request.method][request.url]){
      routes[request.method][request.url](request, response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
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

exports.patch = (url, action) => {
  routes["PATCH"][url] = action;
} 

exports.delete = (url, action) => {
  routes["DELETE"][url] = action;
} 