const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
 

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
app.use(cors(corsOptions));

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
