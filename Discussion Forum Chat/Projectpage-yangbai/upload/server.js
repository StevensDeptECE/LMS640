var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
<<<<<<< HEAD
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
=======
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

>>>>>>> ea08a74e86ea7faf2e128bf7cc9cd6f772542536
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

<<<<<<< HEAD
exports.start = start;
=======
exports.start = start;
>>>>>>> ea08a74e86ea7faf2e128bf7cc9cd6f772542536
