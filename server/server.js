const path = require('path');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// Config
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(compression());
app.use(helmet());

// Static files.
app.use(express.static('dist/'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});
