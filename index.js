const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.get('/welcome', (req, res) => {
  res.s
  res.send('Hello welcome!')
});

app.listen(3000, () => {
  console.log('server started');
});