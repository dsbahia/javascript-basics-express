const express = require('express');
const {
  sayHello,
  uppercase,
  lowercase,
  countCharacters,
  firstCharacter,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');
const { negate, truthiness, isOdd, startsWith } = require('./lib/booleans');

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

  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });

  return res.json({ result: add(a, b) });
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);

  if (isNaN(a) || isNaN(b))
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });

  return res.json({ result: subtract(b, a) });
});

app.post('/numbers/multiply', (req, res) => {
  const { a, b } = req.body;

  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }

  if (isNaN(a) || isNaN(b)) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  return res.json({ result: multiply(a, b) });
});

app.post('/numbers/divide', (req, res) => {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (req.body.a === undefined || req.body.b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).json({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else if (b === 0) {
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else {
    res.json({ result: divide(a, b) });
  }
});

app.post('/numbers/remainder', (req, res) => {
  const { a, b } = req.body;

  if (b === 0) {
    return res.status(400).json({ error: 'Unable to divide by 0.' });
  }
  if (a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  }
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Parameters must be valid numbers.' });
  }

  return res.json({ result: remainder(a, b) });
});

app.post('/booleans/negate', (req, res) => {
  res.json({ result: negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
  res.json({ result: truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:a', (req, res) => {
  const a = parseFloat(req.params.a);
  if (Number.isNaN(a)) {
    return res.status(400).json({ error: 'Parameter must be a number.' });
  }
  res.json({ result: isOdd(a) });
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const { string, character } = req.params;
  if (character.length > 1) {
    return res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }
  res.json({ result: startsWith(character, string) });
});

module.exports = app;
