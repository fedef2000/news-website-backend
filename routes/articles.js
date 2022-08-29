const auth = require('../middleware/auth');
const {Article, validate} = require('../models/article');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const cors = require('cors');
const corsOptions = require('../config/corsOptions');
router.use(cors(corsOptions));


router.get('/', async (req, res) => {
  const articles = await Article.find().sort({date:-1});
  res.send(articles); 
});

router.post('/', [auth], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let article
  article = new Article({ title: req.body.title, subtitle: req.body.subtitle, text: req.body.text, imageURL: req.body.imageURL, tag:req.body.tag ,date: req.body.date });
  article = await article.save();
  res.send(article);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const article = await Article.findByIdAndUpdate(req.params.id, { title: req.body.title, text: req.body.text, imageURL: req.body.imageURL, tag:req.body.tag, date: req.body.date }, {
    new: true
  });

  if (!article) return res.status(404).send('The article with the given ID was not found.');
  
  res.send(article);
});

router.delete('/:id', [auth], async (req, res) => {
  if(!req.params.id){
    res.status(400).send('Id not provided')
  }
  const article = await Article.findByIdAndRemove(req.params.id);

  if (!article) return res.status(404).send('The article with the given ID was not found.');

  res.send(article);
});
 
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).send('The article with the given ID was not found.');      
    res.send(article);
  } catch (err) {
    res.status(400).send(err.message)
  }

});

module.exports = router;