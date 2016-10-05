var Static = require('node-static');
var file = new Static.Server('./dist');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 8080);
