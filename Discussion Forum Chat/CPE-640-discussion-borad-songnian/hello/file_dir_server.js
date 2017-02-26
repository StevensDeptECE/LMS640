'use strict';

var 
    fs = require('fs');//文件系统模块，负责读写文件
    url = require('url');
    path = require('path');
    http = require('http');

var filenames = ['default.html', 'index.html'];

var root = path.resolve('.'); // 使用当前目录
var server = http.createServer(function(request, response) {
    var filename = url.parse(request.url).pathname;
    var filePath = path.join(root, filename);

    fs.stat(filePath, function(err, stat) {
        if (err) {
            console.log('不存在该文件');
            failure(response, '<h2>404 Not Found</h2>');
        } else {
            if (stat.isFile()) {
                console.log('请求的是文件');
                success(response, filePath);
            } else if (stat.isDirectory()) {
                console.log('请求的是目录');
                // 寻找该目录下的 index.html 或者 default.html
                isDir(response, filePath);
            }
        }
    });
});

function isDir(response, dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            failure(response, '<h1>404 该目录不存在</h1>');
        } else {
            console.log(files);
            var names = files.filter(function (x) {
                return x === 'index.html' || x === 'default.html';
            });
            if (names.length !== 0) {
                success(response, path.join(dir, names[0]));
            } else {
                failure(response, '<h1>404 不存在首页</h1>');
            }
        }
    });
}

function success(response, filePath) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(filePath).pipe(response);
}

function failure(response, errString) {
    response.writeHead(404, {'Content-Type': 'text/html', 'charset': 'utf-8'});
    response.end(errString);
}

server.listen(8080);