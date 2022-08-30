const {Article, validate} = require('../models/article');
const express = require('express');
const router = express.Router();

const cors = require('cors');
const corsOptions = require('../config/corsOptions');
router.use(cors(corsOptions));


router.get('/', async (req, res) => {
  const articles = await Article.find().select('tag');
  let tags = []

  articles.forEach((article) => {
    article.tag.forEach(t=>{if(t) tags.push(t)})
  })

  uniqueTags = tags.filter(function(item, pos, self) {
    return self.indexOf(item) === pos;
  })
 
  res.send(uniqueTags); 
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
