const mysql = require('mysql');

 module.exports = (config) => {
    return mysql.createConnection(config);
 };
