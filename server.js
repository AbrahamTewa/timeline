// ******************** NodeJS packages ********************
const express = require('express');

// ******************** Global constants and variables ********************
const app = express();

// ******************** Routes ********************

app.use('/', express.static('docs'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
