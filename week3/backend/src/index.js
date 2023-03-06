const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())

const dotenv = require('dotenv');
dotenv.config();

// const path = require('path')
// const _dirname = path.dirname("")
// const buildPath = path.join(_dirname, "../../frontend/build/static/index.html")

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// app.use(express.static(buildPath))

// Add CORS headers middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Expose-Headers', 'X-My-Custom-Header');
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Request-Date', new Date().toUTCString());
    next();
});

// API create a new user
const pool = require('./db')
const validation = require('./utils/validation')
const search = require('./utils/search')
app.post('/users', async (req, res) => {

    // if(req.headers['Content-Type'] !== 'application/json'){
    //     console.log('Invalid Content-Type')
    //     res.status(400).json('Client Error Response (Invalid Content-Type)')
    //     return
    // }
    
    // if(!req.header['Request-Date']){
    //     console.log('Invalid Request-Date')
    //     res.status(400).json('Client Error Response (Invalid Request-Date)')
    //     return
    // }

    // check eamil uniqueness
    const { name, email, password } = req.body;
    const email_exist = await search.searchByEamil(email);
    if(email_exist){
        console.log('Email Already Exists')
        res.status(403).json('Email Already Exists.')
        return
    }

    // name validation
    const name_valid = validation.name_validation(name);
    if(!name_valid){
        console.log('Invalid Name')
        res.status(400).json('Client Error Response (Name Invalid)')
        return
    }

    // email validation
    const email_valid = validation.em_validation(email);
    if(!email_valid){
        console.log('Invalid Email')
        res.status(400).json('Client Error Response (Email Invalid)')
        return
    }

    // password validation
    const pw_valid = validation.pw_validation(password);
    if(!pw_valid){
        console.log('Invalid Password')
        res.status(400).json('Client Error Response (Password Invalid)')
        return
    }

    // insert into DB
    const q = "insert into user (name, email, password) values (?, ?, ?)"
    const values = [name, email, password]
    const [rows, fields] = await pool.execute(q, values);
    const date = res.get('Request-Date');
    // console.log(date)
    const result = {
        'data': {
            'user':{
                'id': rows.insertId,
                'name': name,
                'email': email
            },
            'date': date
        }
    }
    // console.log(result)
    res.status(200).json(result)
})

// Listen on server port
const port = process.env.SERVER_PORT || 4000 ;
app.listen(port, () => {
    console.log(`Server runnning on port ${port}`)
})

// Router
const basicRouter = require('./routes/basic');
app.use('/', basicRouter);
const userRouter = require('./routes/users');
app.use('/users', userRouter);