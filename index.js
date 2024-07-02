const express = require('express');
const app = express();
const port = 3030;

app.get('/', (req, res) => {
  res.send('Hello daya  World!');
});

app.listen(port, () => {
  console.log(`Demo app listening at http://localhost:${port}`);
});

