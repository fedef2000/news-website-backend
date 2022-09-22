const auth = require('../middleware/auth');
const {Article, validate} = require('../models/article');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId

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
  article = new Article({ title: req.body.title, subtitle: req.body.subtitle,titleUrl: req.body.titleUrl, text: req.body.text, imageURL: req.body.imageURL, tag:req.body.tag ,date: req.body.date });
  article = await article.save();
  res.send(article);
});

router.put('/:id', async (req, res) => {
  if(!ObjectId.isValid(req.params.id)) return res.status(400).send('Id not valid')
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let article = await Article.findByIdAndUpdate(req.params.id, { title: req.body.title, titleUrl: req.body.titleUrl, subtitle: req.body.subtitle, text: req.body.text, imageURL: req.body.imageURL, tag:req.body.tag, date: req.body.date }, {
    new: true
  });

  if (!article) return res.status(404).send('The article with the given ID was not found.');
  article = await article.save();
  
  res.send(article);
});

router.delete('/:id', [auth], async (req, res) => {
  if(!ObjectId.isValid(req.params.id)) return res.status(400).send('Id not valid')
  const article = await Article.findByIdAndRemove(req.params.id);
  if (!article) return res.status(404).send('The article with the given ID was not found.');

  res.send(article);
});

router.get('/title/:titleUrl', async (req, res) => {
  try {
    const article = await Article.findOne({titleUrl: req.params.titleUrl});
    if (article.length === 0) return res.status(404).send('The article with the given title was not found.');      
    res.send(article);
  } catch (err) {
    res.status(400).send(err.message)
  }
});

router.post('/search', async (req,res) => {
  if(!req.body.string){
    return res.status(400).send("string is required in body request")
  }
  const articles = await Article.find({ text: { $regex: req.body.string , $options: "i" } })
  if(articles.length === 0){
    res.status(404).send("nessun articolo trovato")
  }else{
    res.send(articles)
  }
})

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