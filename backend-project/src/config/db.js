const mysql = require('mysql2');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mk'
});
db.connect((err)=>{
    if(err){
        console.err('error connecting to the database', err);
        return;
    }
    console.log('connected to the database successfully');
});

module.exports = db;