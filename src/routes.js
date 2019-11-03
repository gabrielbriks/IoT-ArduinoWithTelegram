const routes = require('express').Router();

routes.get('/', function(req, res) {
    return res.send('<br><i>Server ON!</i>');
  });

  module.exports = routes;