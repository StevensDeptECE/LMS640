<<<<<<< HEAD
function route(handle, pathname, response, request) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/html"});
=======
function route(handle, pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
>>>>>>> ea08a74e86ea7faf2e128bf7cc9cd6f772542536
    response.write("404 Not found");
    response.end();
  }
}

<<<<<<< HEAD
exports.route = route;
=======
exports.route = route;
>>>>>>> ea08a74e86ea7faf2e128bf7cc9cd6f772542536
