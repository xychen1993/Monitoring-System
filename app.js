var express = require('express');
var http = require('http');
var app = express();

app.use(express.static(__dirname));

app.listen(8080, function(){
  console.log('app listening on port 8080');
});

app.get('*', function(req, res) {
    res.send('index.html'); // load our public/index.html file
});

exports = module.exports = app;
