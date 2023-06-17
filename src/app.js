const express = require('express');
const { sayHello, uppercase, lowercase } = require('./lib/strings');

const app = express();

app.get('/strings/hello/:name', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

module.exports = app;
