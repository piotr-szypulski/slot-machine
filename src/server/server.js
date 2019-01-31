import express from 'express';
import path from 'path';

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server is up on port ${PORT}.`);
  console.log('Press Ctrl+C to quit.');
  /* eslint-enable no-console */
});
