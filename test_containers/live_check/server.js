'use strict';

const express = require('express');
const moment  = require("moment");

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

var startTime = moment();
console.log(`Start time: ${startTime}`);

function elapsedSeconds(){
  var thisTime = moment();
  var timeDifference = thisTime.diff(startTime, 'seconds')
  return parseInt(timeDifference);
}

app.get('/', function(req, res) {
    res.sendStatus(404);
});

app.get('/healthz', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var elap = elapsedSeconds();
    console.log(`Received health check from: ${ip}`);
    console.log(` - APP Started at: ${startTime}`);
    console.log(` - Elapsed seconds: ${elap}`);
    if(elap > 10) {
        res.status(500).send(`ERR - Started at ${startTime}\n`);
    } else {
        res.send(`OK - Started at ${startTime}\n`)
    }
});

app.get('/started', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Received started check from: ${ip}`);
    console.log(` - APP Started at: ${startTime}`);
    res.send(`Started at ${startTime}\n`)
});

app.get('/uptime', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var elap = elapsedSeconds();
    console.log(`Received uptime check from: ${ip}`);
    console.log(` - APP Started at: ${startTime}`);
    console.log(` - Elapsed seconds: ${elap}`);
    res.send(`Uptime ${elap}s\n`)
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

