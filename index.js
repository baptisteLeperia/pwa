// Loading of the express module
var express = require('express');
var http = require('http');
  
// Create a service (the app object is just a callback).
var app = express();

app.use(express.static('/home/m1leperia/Documents/ginkobus-pwa'));

// Create an HTTP service.
http.createServer(app).listen(8080);

console.log("C'est parti. En attente de connexion en HTTP (port 8080)...");