'use strict';

const express = require('express');
const os = require("os");
const cowsay = require("cowsay");
const dateFormat = require('dateformat');

var animals = [ "cat", "daemon", "default", "docker-whale", "elephant2",
    "happy-whale", "kitten", "lobster", "mule", "octopus", "owl", "squirrel",
    "snoopysleep", "whale" ];
var default_text = 'Hello %IP%, I am %HOSTNAME%!';

// define Animal on APP startup
var randanimal = animals[Math.floor(Math.random() * animals.length)];
var animal = process.env.ANIMAL || randanimal;
console.log(`Animal identity: ${animal}`);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var hostname = os.hostname();
  var httphost = req.headers.host || "<unknown>";
  var now = new Date();
  var v_date = dateFormat(now, "yyyy-mm-dd");
  var v_time = dateFormat(now, "HH:MM:ss");
  var v_datetime = dateFormat(now, "yyyy-mm-dd HH:MM:ss");

  var saytext = process.env.SAY || default_text;

  saytext = saytext.replace(/%IP%/g, ip);
  saytext = saytext.replace(/%HOSTNAME%/g, hostname);
  saytext = saytext.replace(/%HTTPHOST%/g, httphost);
  saytext = saytext.replace(/%DATE%/g, v_date);
  saytext = saytext.replace(/%TIME%/g, v_time);
  saytext = saytext.replace(/%DATETIME%/g, v_datetime);

  var say = cowsay.say({
    text: saytext,
    f: animal
  });
  res.render('index', {
    'say': say,
    'animal': animal
  });
});

app.get('/health', function(req, res) {
  res.send({ 'status': 'OK' });
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

