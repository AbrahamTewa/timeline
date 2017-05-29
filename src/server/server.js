// ******************** NodeJS packages ********************
import express from 'express';

// ******************** Global constants and variables ********************
const app = express();

// ******************** Routes ********************

app.use('/', express.static('build'));

app.get('/helloWorld', function (req, res) {
    res.send('hello world');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
