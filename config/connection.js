const mysql = require('mysql2');

const db = mysql.createConnection({
        "host": 'localhost',
        // MySQL username,
        "user": 'root',
        "password": 'password',
        "database": 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

module.exports = db;