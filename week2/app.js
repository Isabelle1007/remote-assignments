const express = require('express');
const bodyParser = require('body-parser');
// const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require('./user.router');
const crypto = require("crypto");
const pool = require('./db')

// const morgan = require('morgan');
// const cors = require('cors');
// const helmet = require('helmet');

const app = express(); // returns an express application

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json ( simplify the HTTP text --> console.log(req.body.text) )
app.use(bodyParser.json());

// enabling CORS for all requests
// app.use(cors());
app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

// adding morgan to log HTTP requests
// app.use(morgan('combined'));

app.get('/', (req, res) => { // parameter: path, callback
    res.json('Hi, welcome to the root page');
});

app.get('/healthcheck', (req, res) => { 
    res.json('This is the API named healthcheck');
});

// set up a development server listening on port 3000
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
});

// pool.query(
//     'SELECT * FROM user', 
//     function(err, results, fields) {
//         console.log('query success')
//         // console.log(results) // results contains rows returned by server
//         // console.log(fields) // fields contains extra meta data about results, if available
// })

app.use('/users', userRouter);




