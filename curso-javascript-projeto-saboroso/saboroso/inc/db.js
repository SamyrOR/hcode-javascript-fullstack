const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'saboroso',
    password: '$Amyr!2345'
})
module.exports = connection;