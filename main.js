const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser')
const db = require('./database.js');
const { time } = require('console');

const app = express();
app.use(cookieParser());

app.use("/",express.static("./src"));

//timing API
app.get('/timegoesbrr', async function (req, res) {
    params = req.query;
    console.log(params);

    // new User
    if (params.n) {
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
      
    } else {

    }
})


app.listen(8888);
