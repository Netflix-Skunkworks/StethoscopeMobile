var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
  fs.readFile(`${__dirname}/index.html`, function(error, content) {
    if (!error) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });

}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');