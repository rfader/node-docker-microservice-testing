const request = require('request');

const uri = process.env.NODE_ENV === 'test' ? 'http://localhost:3001' : 'http://auth_service:3001';

module.exports = (connection) => {
    return (req, res) => {
        request.get({
            url: `${uri}/auth`,
            headers: {
                Authorization: req.get('Authorization')
            }
        }, (error, response) => {
            if (error || response.statusCode !== 200) {
                const statusCode = response ? response.statusCode : 400;
                res.status(statusCode).send(error);
                return;
            }
            connection.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    res.status(400).send(err);
                    return;
                }
                res.status(200).send(results);
            });
        });
    }
}
