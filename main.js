const express = require('express')
const app = express()


//main landing page
app.get('/', function (req, res) {
  console.log(req.query)
})


//timing API
app.get('/timegoesbrr', function (req, res) {
    console.log(req.query)
})
  
app.listen(1337)
