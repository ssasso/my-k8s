'use strict';

const express = require('express');
const os = require("os");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.render('index', {
	  base: req.protocol + "://" + req.headers.host,
	  hostname: os.hostname(),
	  remote: ip,
	  host: req.headers.host
  });
});

app.get('/headers', function(req, res) {
  res.render('headers', {
          h: req.headers
  });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

