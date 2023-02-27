const express = require('express');
// const bodyParser = require('body-parser');
const mysql = require('mysql2');
// const dotenv = require('dotenv');

// dotenv.config();
const app = express(); // returns an express application

// simplify the HTTP text --> console.log(req.body.text)
// app.use(bodyParser.json());

// set up a development server listening on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
});

app.get('/', (req, res) => { // parameter: path, callback
    res.send('<h2>Hi, welcome to the root page</h2>');
});

app.get('/healthcheck', (req, res) => { 
    res.send('This is the first API named healthcheck');
});

// Create DB
const db = mysql.createConnection({
    connectionLimit: 10,
    // host: "newdb.cooo3yiqpu2z.ap-northeast-1.rds.amazonaws.com",
    host: "mysql00.cooo3yiqpu2z.ap-northeast-1.rds.amazonaws.com",
    // host: "localhost",
    user: "Isabelle",
    password: "20001007",
    database: "assignment",
    port: 3306
});

db.connect(function(error){
    if(error)
    {
        throw error;
    }
    else
    {
        console.log("Database is connected successfully.");
    }
});

// simple query
db.query(
    'SELECT * FROM `user`', function(err, results, fields) {
    //   console.log(results); // results contains rows returned by server
    //   console.log(fields); // fields contains extra meta data about results, if available
    console.log(err);
    }
);

// API POST
app.post('/users', (req, res) => {

})

// API GET
app.get('/users', (req, res) => {

    
})

// regular expression
function validation(name, email, password){

}



