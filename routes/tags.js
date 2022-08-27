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

router.get('/:tag', async (req, res) => {
  try {
    const article = await Article.find({tag:req.params.tag});
    if (!article) return res.status(404).send(`No articles found with this ${req.params.tag} tag`);      
    res.send(article);
  } catch (err) {
    res.status(400).send(err.message)
  }

});

module.exports = router; 
