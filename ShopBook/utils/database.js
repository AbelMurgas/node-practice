const mysql = require('mysql2');

const pool = mysql.createPool({
 host: 'localhost',
 user: 'root',
 database: 'test',
 password: '212319972006'
});

module.exports = pool.promise();