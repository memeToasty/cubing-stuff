const express = require('express')
const fs = require('fs');
const app = express()
const db = require('./database.js');

//index.css
app.get('/index.css', function (req, res) {
  console.log(req.query)
  fs.readFile(process.cwd()+"/index.css", function(err,data)
  {
    if(err)
      console.log(err)
    else
      res.send(data);
  });
})

//fav icon damit FireFox mir nicht auf den Sack geht
app.get('/favicon.ico', function (req, res) {
  console.log(req.query)
  fs.readFile(process.cwd()+"/favico.ico", function(err,data)
  {
    if(err)
      console.log(err)
    else
      res.send(data);
  });
})

//main landing page
app.get('/', function (req, res) {
  fs.readFile(process.cwd()+"/index.html", function(err,data)
  {
    if(err)
      console.log(err)
    else
      res.send(data.toString());
  });
})


//timing API
app.get('/timegoesbrr', function (req, res) {
    params = req.query;
    console.log(params);

    // new User
    if (params.n) {
      var id = db.newUser(params.n, params.t);
      // Initiate "cuber session"
    }
    res.send(200);
})


app.listen(8888);
