const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser')
const db = require('./database.js');
const config = require('./credentials.json');
const { time } = require('console');

const app = express();
app.use(cookieParser());

app.use("/",express.static("./src"));

//Time data to front end
app.get('/getData', async function (req, res) {
  params = req.query;
  const userData = await db.getUserData(params.id);
  res.status(200).json({
    x: userData[0].date,
    y: userData[0].times
  });
});

//timing API
app.get('/timegoesbrr', async function (req, res) {
    params = req.query;
    console.log(params);

    // new User
    if (params.n) {
      console.log("insert new user");
      const id = await db.newUser(params.n, params.t);
      await new Promise ((set) => {
        setTimeout(set,200);
      });
      // Initiate "cuber session"
      console.log(id);
      res.cookie('id',id);
      res.cookie('name',params.n)
      res.status(200).json({
        success: true,
        "id": id
      }).end();
      
    } 
    // log in
    else if (params.li) {
      const id = params.li;
      const result = await db.getUserData(id);
      console.log(result);
      if (result.length == 1) {
        res.cookie('id',id);
        res.cookie('name', result[0].username);
        res.status(200).json({
          success: true
        });

      } else if (result.length == 0) {
        console.log("sent 400")
        res.status(400).json({
          success: false,
          msg: "No user with this id was found"
        });

      } else {
        console.log("internal error");
        res.status(555).json({
          success: false,
          msg: "Internal Error (found more than one id) Please file a bug report https://github.com/memeToasty/cubing-stuff/issues"
        });
      }
    } else if (params.i) {
      const id = params.i;
      await db.insertTime (id, params.t);
    }
});


app.listen(config.webserver.port);
