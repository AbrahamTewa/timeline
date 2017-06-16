/* eslint-env node */

// Will run an express server serving build files

let express = require('express');
let app = express();
const port = 3000;

app.use('/', express.static('build/index.html'));
app.use(express.static('build'));

app.listen(port, function () {
    console.log(`Starter React App served on ${port}`);
});
