'use strict';

const route = require('express').Router();
const api = require('../lib/api');

route.get('/', api.index);
route.post('/send', api.sendMail);

module.exports = route;
