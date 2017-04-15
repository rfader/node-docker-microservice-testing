const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function createService(method, url, body) {
    app[method](url, (req, res) => {
        res.send(body);
    });
}

createService('get', '/auth');

module.exports = (port) => {
    return new Promise((resolve, reject) => {
        try {
            app.listen(port, () => {
                resolve();
            });
        } catch (e) {
            reject(e);
        }
    });
};

