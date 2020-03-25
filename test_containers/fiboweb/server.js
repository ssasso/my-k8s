'use strict';

const express = require('express');
const os = require("os");

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

function fib(n) {
    if(n > 1){
        return fib(n-1) + fib(n-2)
    } else {
        return n;
    }
}

app.get('/', function(req, res) {
    res.sendStatus(404);
});

app.get('/fibonacci/:n', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`Received FIBONACCI request from: ${ip}`);
    var nstr = req.params.n || "";
    var n = parseInt(nstr);
    if (isNaN(n)) { n = 0; }
    console.log(`Received input ${n} (${nstr})`);
    var r = fib(n);
    console.log(`fib(${n}) = ${r}`);
    res.send({
        'n': n,
        'fib(n)': r,
        'server': os.hostname()
    });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

