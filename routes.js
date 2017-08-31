//initial requires
'use strict';
const express = require('express');
const app = express();
const knex = require('./knex');
const cors = require('cors');
const bodyParser = require('body-parser')


const port = process.env.PORT || 3800;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res, next) => {
  knex('users')
    .select(['id', 'username', 'twitter', 'discord'])
    .then(userInfo => res.send(userInfo))
    .catch(err => next(err));
});

app.get('/username', (req, res, next) => {
  knex('users')
    .select('username')
    .then(response => {
      res.send(response)
    })
})

app.get('/twitter', (req, res, next) => {
  knex('users')
    .select('twitter')
    .then(response => {
      res.send(response)
    })
})

app.get('/discord', (req, res, next) => {
  knex('users')
    .select('discord')
    .then(response => {
      res.send(response)
    })
})

app.post('/', (req, res, next) => {
  console.log(req.body);
  console.log("IN THE POST ROUTE");
  knex('users')
  .insert(req.body)
  .returning(['id', 'username', 'twitter', 'discord'])
  .then(userInfo => res.send(userInfo))
  .catch(err => next(err));
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
