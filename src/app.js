const express = require('express');
const { sayHello, uppercase } = require('./lib/strings');

const app = express();

app.get('/strings/hello/:name', (req, res) => {
  const { name } = req.params;
  const greeting = sayHello(name);
  res.json({ result: greeting });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

module.exports = app;
