const express = require('express')
const fs = require('fs');
const app = express()

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
  console.log(req.query)
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
    console.log(req.query)
    res.send(200);
})
  
app.listen(1337)
