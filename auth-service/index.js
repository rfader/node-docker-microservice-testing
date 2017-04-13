const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = {
    port: 3001,
};

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/auth', (req, res) => {
    res.status(200).end();
});

app.listen(config.port, () => {
    console.log('Auth service running on port:', config.port);
});
