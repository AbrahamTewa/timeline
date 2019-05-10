/* eslint-env node */

// Will run an express server serving build files

const express = require('express');

const app = express();
const port = 3000;

app.use('/', express.static('build/index.html'));
app.use(express.static('build'));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Starter React App served on ${port}`);
});
