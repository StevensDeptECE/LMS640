'use strict';
var http = require('http');

http.createServer(function (request, response) {

	// send http head
	// HTTP status value: 200 : OK
	// content-type: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// send response "Hello World"
	response.end('Hello World\n');
}).listen(8888);

// terminal print:
console.log('Server running at http://127.0.0.1:8888/');
//and then open  http://127.0.0.1:8888/, "hello world " show up