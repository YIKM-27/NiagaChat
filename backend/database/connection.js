const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',                
    password: '',                
    database: 'db_belajar_login' 
});

db.connect((err) => {
    if (err) {
        console.error('❌ Data Base Eror:', err.message);
    } else {
        console.log('Gas poll bantai pak isan');
    }
});

module.exports = db;