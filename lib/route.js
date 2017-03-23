'use strict';

const APIError = require('./api_error');
const logger = require('./logger');

module.exports = callback => {
  return (req, res) => {
    new Promise((resolve, reject) => {
      callback(req, resolve, reject);
    })
    .then(out => {
      res.json({
        'success': out
      });
    })
    .catch(err => {
      if (!(err instanceof APIError)) {
        logger.error(err, {
          body: req.body
        });
        err.message = 'API Error occurred';
      }
      res.status(500);
      res.json({
        error: err.message
      });
    });
  };
}
