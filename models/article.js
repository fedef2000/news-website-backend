const Joi = require('joi');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100  
  },
  subtitle:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250  
  },
  text:{
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20000  
  },
  image: { 
    data: Buffer, 
    contentType: String
  },
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

function validateArticle(article) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    subtitle: Joi.string().min(5).max(250).required(),
    text: Joi.string().min(10).max(20000).required(),
  });

  return schema.validate(article)
}

exports.articleSchema = articleSchema;
exports.Article = Article; 
exports.validate = validateArticle;