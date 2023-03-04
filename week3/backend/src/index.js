const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')

const dotenv = require('dotenv');
dotenv.config();

const basicRouter = require('./routes/basic');
app.use('/', basicRouter);
const userRouter = require('./routes/users');
app.use('/users', userRouter);

app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// enabling CORS for all requests
app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Request-Date', new Date().toUTCString());
    next();
});

const port = process.env.SERVER_PORT || 4000 ;
app.listen(port, () => {
    console.log(`Server runnning on port ${port}`)
})