const express = require('express');
const {
  sayHello,
  uppercase,
  lowercase,
  countCharacters,
  firstCharacter,
} = require('./lib/strings');

const {
  add,
  subtract,
  multiply,
  divide,
  power,
  round,
  roundUp,
  roundDown,
  absolute,
  quotient,
  remainder,
} = require('./lib/numbers');

const app = express();
app.use(express.json());

app.get('/strings/hello/:name', (req, res) => {
  res.json({ result: sayHello(req.params.name) });
});

app.get('/strings/upper/:string', (req, res) => {
  res.json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.json({ result: lowercase(req.params.string) });
});

app.get('/strings/count/:string', (req, res) => {
  const { string } = req.params;
  const result = countCharacters(string);
  res.json({ result });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const { string } = req.params;
  const { length } = req.query;
  const result = length ? firstCharacter(string, parseInt(length, 10)) : firstCharacter(string);
  res.json({ result });
});

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b))
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });

  return res.json({ result: add(a, b) });
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b))
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });

  return res.json({ result: subtract(b, a) });
});

app.post('/numbers/multiply', (req, res) => {
  const { a, b } = req.body;

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });

  return res.json({ result: multiply(a, b) });
});

app.post('/numbers/divide', (req, res) => {
  const { a, b } = req.body;

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  if (b === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }

  return res.json({ result: divide(a, b) });
});

module.exports = app;
