const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser')
const db = require('./database.js');
const { time } = require('console');

const app = express();
app.use(cookieParser());

function callLandingPage (req, res) {
  console.log(req.cookies);
  fs.readFile(process.cwd()+"/index.html", function(err,data)
  {
    if(err)
      console.log(err)
    else
      res.send(data.toString());
  });
}

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

//fav icon damit Browser mir nicht auf den Sack gehen
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
  callLandingPage(req,res);
})


//timing API
app.get('/timegoesbrr', async function (req, res) {
    params = req.query;
    console.log(params);

    // new User
    if (params.n) {
      var id = db.newUser(params.n, params.t);
      await new Promise ((set) => {
        setTimeout(set,100);
      });
      // Initiate "cuber session"
      res.cookie('id',params.n);
      res.status(200).json({
        success: true
      }).end();
      
    }
})


app.listen(8888);
