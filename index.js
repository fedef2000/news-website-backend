const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const data = require('./news')
const cors = require('cors');
const corsOptions = require('../config/corsOptions');

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

//app.use(cors(corsOptions));

app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://main--stellular-tiramisu-05e0cc.netlify.app"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/articoli', (req, res) => {
  res.send(data)
})

app.get('/articoli/:id', (req, res) => {
    if(req.params.id > 4 || req.params.id <= 0){
        res.send([])
    }else{
        res.send(data[req.params.id - 1])
    }
  })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
