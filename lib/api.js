'use strict';

const config = require('config');
const es = require('email-services');
const route = require('./route');
const APIError = require('./api_error');

const sendgrid = new es.SendGrid(config.SendGrid.username, config.SendGrid.password);
const mailgun = new es.Mailgun(config.Mailgun.username, config.Mailgun.password);
const mandrill = new es.Mandrill(config.Mandrill.username, config.Mandrill.password);
const ses = new es.SES(config.SES.username, config.SES.password, config.SES.region);
const emailService = new es.EmailService([
  sendgrid,
  mailgun,
  mandrill,
  ses
]);

const api = {};

api.index = route((req, resolve, reject) => {
  resolve({
    isApiDown: false
  });
});

api.sendMail = route((req, resolve, reject) => {
  if (!req.body.to) {
    throw new APIError('\'to\' required when sending an Email.');
  }
  if (!req.body.from) {
    throw new APIError('\'from\' required when sending an Email.');
  }

  emailService.sendEmail({
    to: req.body.to,
    from: req.body.from,
    cc: req.body.cc,
    bcc: req.body.bcc,
    subject: req.body.subject,
    text: req.body.text,
    html: req.body.html
  })
  .then(res => {
    resolve(true);
  })
  .catch(err => {
    reject(new APIError('Sending failed.'));
  });
});

module.exports = api;
