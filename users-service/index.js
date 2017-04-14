const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const users = require('./users');

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

app.get('/users', users(connection));

app.listen(config.port, () => {
    console.log('User service running on port:', config.port);
});
