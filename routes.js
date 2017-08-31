//initial requires
'use strict';
const express = require('express');
const app = express();
const knex = require('./knex');

const port = process.env.PORT || 3800;

app.get('/', (req, res, next) => {
  knex('users')
    .select(['id', 'username', 'twitter', 'discord'])
    .then(userInfo => res.send(userInfo))
    .catch(err => next(err));
});

app.post('/', (req, res, next) => {
  // console.log(req.body);
  // console.log("IN THE POST ROUTE");
  knex('wallybot')
  .insert(req.body)
  .returning(['id', 'username', 'twitter', 'discord'])
  .then(userInfo => res.send(userInfo))
  .catch(err => next(err));
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
