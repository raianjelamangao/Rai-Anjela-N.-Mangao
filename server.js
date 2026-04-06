const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/calc', (req, res) => {
  const { a, b, op } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number' || !op) {
    return res.status(400).json({ error: 'Invalid input.' });
  }

  let result;
  switch (op) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed.' });
      }
      result = a / b;
      break;
    case 'power':
      result = Math.pow(a, b);
      break;
    default:
      return res.status(400).json({ error: 'Unsupported operator.' });
  }

  res.json({ result });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});