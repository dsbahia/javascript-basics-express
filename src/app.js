const express = require('express');
const { sayHello, uppercase, lowercase, firstCharacter } = require('./lib/strings');

const app = express();

app.get('/strings/hello/:name', (req, res) => {
  res.json({ result: sayHello(req.params.name) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  res.json({ result: firstCharacter(req.params.string) });
});

module.exports = app;
