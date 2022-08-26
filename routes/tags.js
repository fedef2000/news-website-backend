const {Article, validate} = require('../models/article');
const express = require('express');
const router = express.Router();

const cors = require('cors');
const corsOptions = require('../config/corsOptions');
router.use(cors(corsOptions));


router.get('/', async (req, res) => {
  const articles = await Article.find().select('tag');
  let results = []
  articles.forEach((article) => {
    if(results.findIndex((e) => { return e === article.tag}) === -1){
        if(article.tag){
            results.push(article.tag)
        }
    } 
  })
  res.send(results); 
});


module.exports = router; 
