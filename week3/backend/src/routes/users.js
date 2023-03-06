const router = require('express').Router();
const pool = require('../db')
const validation = require('../utils/validation')
const search = require('../utils/search')

// // API create a new user
// router.post('/users', async (req, res) => {

//     console.log('post User API')
//     if(!req.header('Content-Type', 'application/json')){
//         console.log('Invalid Content-Type')
//         res.status(400).json('Client Error Response (Invalid Content-Type)')
//         return
//     }
    
//     const requestDate = new Date().toUTCString();
//     if(!req.header('Request-Date', requestDate)){
//         console.log('Invalid Request-Date')
//         res.status(400).json('Client Error Response (Invalid Request-Date)')
//         return
//     }

//     // check eamil uniqueness
//     const { name, email, password } = req.body;
//     const email_exist = await search.searchByEamil(email);
//     if(email_exist){
//         console.log('Email Already Exists')
//         res.status(403).json('Email Already Exists.')
//         return
//     }

//     // name validation
//     const name_valid = validation.name_validation(name);
//     if(!name_valid){
//         console.log('Invalid Name')
//         res.status(400).json('Client Error Response (Name Invalid)')
//         return
//     }

//     // email validation
//     const email_valid = validation.em_validation(email);
//     if(!email_valid){
//         console.log('Invalid Email')
//         res.status(400).json('Client Error Response (Email Invalid)')
//         return
//     }

//     // password validation
//     const pw_valid = validation.pw_validation(password);
//     if(!pw_valid){
//         console.log('Invalid Password')
//         res.status(400).json('Client Error Response (Password Invalid)')
//         return
//     }

//     // insert into DB
//     const q = "insert into user (name, email, password) values (?, ?, ?)"
//     const values = [name, email, password]
//     const [rows, fields] = await pool.execute(q, values);
//     const date = res.get('Request-Date');
//     const result = {
//         'data': {
//             'user':{
//                 'id': rows.insertId,
//                 'name': name,
//                 'email': email
//             },
//             'date': date
//         }
//     }
//     res.status(200).json(result)
// })

// API get all users
router.get('/all', async (req, res) => {
    const q = 'SELECT * FROM user';
    const [rows, fields] = await pool.execute(q);
    if(rows.length > 0){
        const results = []
        for(var i = 0; i < rows.length; i++){
            let result = {
                'data': {
                    'user':{
                        'id': rows[i].id,
                        'name': rows[i].name,
                        'email': rows[i].email
                    }
                }
            }
            results.push(result)
        }
        res.status(200).json(results)
    }else{
        res.status(400).send(`Client Response Error (No users exist)`)
    }
})

// API get user by id
router.get('/', async (req, res) => {

    if(!req.header('Content-Type', 'application/json')){
        res.status(400).json('Client Error Response (Invalid Content-Type)')
        return
    }
    
    const requestDate = new Date().toUTCString();
    if(!req.header('Request-Date', requestDate)){
        res.status(400).json('Client Error Response (Invalid Request-Date)')
        return
    }

    const { id } = req.query;
    const user_exist = await search.searchById(id);
    if(user_exist){
        const q = 'SELECT * FROM user WHERE id = ?';
        const [rows, fields] = await pool.execute(q, [id]);
        // console.log(res)
        const date = res.get('Request-Date');
        console.log(date)
        const result = {
            'data': {
                'user':{
                    'id': rows[0].id,
                    'name': rows[0].name,
                    'email': rows[0].email
                },
                'date': date
            }
        }
        res.status(200).json(result)
    }else{
        res.status(400).send(`Client Response Error (User doesn't exist)`)
    }
})

module.exports = router;