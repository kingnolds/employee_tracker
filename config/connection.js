const db = require('mysql2-promise')();

db.configure({
        "host": 'localhost',
        // MySQL username,
        "user": 'root',
        "password": 'password',
        "database": 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

module.exports = db;