const express = require('express');
const articles = require('../routes/articles');
const users = require('../routes/users');
const auth = require('../routes/auth');
const tags = require('../routes/tags');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/articles', articles);
  app.use('/api/tags', tags);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
}