'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => res.json({ isApiDown: false }))
app.use('/api/', api);

// catch 404 and forward to   error handler
app.use(function (req, res, next) {
  const err = new Error('404: Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  const out = {}
  out.error = err.message;

  res.status(err.status || 500);
  res.json(out);
});

module.exports = app;
