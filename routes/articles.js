const auth = require('../middleware/auth');
const {Article, validate} = require('../models/article');
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const fs = require('fs')
const upload = multer();
const router = express.Router();

const cors = require('cors');
const corsOptions = require('../config/corsOptions');
router.use(cors(corsOptions));


router.get('/', async (req, res) => {
 // fs.readFile('./images/default.jpg', async (err,data) =>{
  const articles = await Article.find().sort({date:-1}).limit(7);
  /*
  const results = articles.map( (a) => {
    let r = {...a._doc}

    if(!a.image.data){
        if (err) throw err;
        r.image.data = data;
        r.image.contentType = 'image/jpeg'
        console.log(r)
        return r
      }
      return r
    })
    */
    res.send(articles); //results
  //})
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let article
  if(req.file){ //se c'è req.file allora è stata caricata anche l'immagine
    let image = {
      data:req.file.buffer,
      contentType: req.file.mimetype
    }
    article = new Article({ title: req.body.title, subtitle: req.body.subtitle, text: req.body.text, image: image, date: req.body.date });
  }else{ 
    article = new Article({ title: req.body.title, subtitle: req.body.subtitle, text: req.body.text, date: req.body.date }); //
  }
  article = await article.save();
  res.send(article);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const article = await Article.findByIdAndUpdate(req.params.id, { title: req.body.title, text: req.body.text, image: req.body.image, date: req.body.date }, {
    new: true
  });

  if (!article) return res.status(404).send('The article with the given ID was not found.');
  
  res.send(article);
});

router.delete('/:id', [auth], async (req, res) => {
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