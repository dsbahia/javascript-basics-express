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
const {
  getNthElement,
  arrayToCSVString,
  addToArray2,
  elementsStartingWithAVowel,
  removeNthElement2,
} = require('./lib/arrays');

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
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b))
    res.status(400).json({ error: 'Parameters must be valid numbers.' });

  res.json({ result: add(a, b) });
});

app.get('/numbers/subtract/:a/from/:b', (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);

  if (Number.isNaN(a) || Number.isNaN(b))
    res.status(400).json({ error: 'Parameters must be valid numbers.' });

  res.json({ result: subtract(b, a) });
});

app.post('/numbers/multiply', (req, res) => {
  const { a, b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (isNaN(a) || isNaN(b)) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  } else {
    res.json({ result: multiply(a, b) });
  }
});

app.post('/numbers/divide', (req, res) => {
  const a = parseFloat(req.body.a);
  const b = parseFloat(req.body.b);

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
    res.status(400).json({ error: 'Unable to divide by 0.' });
  } else if (a === undefined || b === undefined) {
    res.status(400).json({ error: 'Parameters "a" and "b" are required.' });
  } else if (isNaN(a) || isNaN(b)) {
    res.status(400).json({ error: 'Parameters must be valid numbers.' });
  } else {
    res.json({ result: remainder(a, b) });
  }
});

app.post('/booleans/negate', (req, res) => {
  res.json({ result: negate(req.body.value) });
});

app.post('/booleans/truthiness', (req, res) => {
  res.json({ result: truthiness(req.body.value) });
});

app.get('/booleans/is-odd/:a', (req, res) => {
  const a = parseInt(req.params.a);
  if (Number.isNaN(a)) {
    res.status(400).json({ error: 'Parameter must be a number.' });
  }
  res.json({ result: isOdd(a) });
});

app.get('/booleans/:string/starts-with/:character', (req, res) => {
  const { string, character } = req.params;
  if (character.length > 1) {
    res.status(400).json({ error: 'Parameter "character" must be a single character.' });
  }
  res.json({ result: startsWith(character, string) });
});

app.post('/arrays/element-at-index/:index', (req, res) => {
  const { index } = req.params;
  const { array } = req.body;
  res.json({ result: getNthElement(index, array) });
});

app.post('/arrays/to-string', (req, res) => {
  const { array } = req.body;
  res.json({ result: arrayToCSVString(array) });
});

app.post('/arrays/append', (req, res) => {
  const { array, value } = req.body;
  res.json({ result: addToArray2(value, array) });
});

app.post('/arrays/starts-with-vowel', (req, res) => {
  const { array } = req.body;
  res.json({ result: elementsStartingWithAVowel(array) });
});

app.post('/arrays/remove-element', (req, res) => {
  const { index } = req.query;
  const { array } = req.body;

  if (index !== undefined) {
    res.json({ result: removeNthElement2(parseInt(index), array) });
  } else {
    res.json({ result: removeNthElement2(0, array) });
  }
});

module.exports = app;
