const express = require('express');
const morgan = require('morgan');
const request = require('request');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const config = {
    port: process.env.PORT || 3000,
    db: {
        host: 'users_mysql',
        database: 'database_development',
        user: 'root',
        password: 'root-password',
        port: '3306'
    }
};

const connection = mysql.createConnection(config.db);

connection.query([
    'CREATE TEMPORARY TABLE users (',
    '`id` int(11) unsigned NOT NULL AUTO_INCREMENT,',
    '`name` varchar(255),',
    'PRIMARY KEY (`id`)',
    ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4'
].join('\n'));

connection.query('INSERT INTO users SET ?? = ?, ?? = ?', ['id', 1, 'name', 'john']);
connection.query('INSERT INTO users SET ?? = ?, ?? = ?', ['id', 2, 'name', 'jane']);

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    request({
        url: 'http://auth_service:3001/auth',
        method: 'GET',
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
});

app.listen(config.port, () => {
    console.log('User service running on port:', config.port);
});
