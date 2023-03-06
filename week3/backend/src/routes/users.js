const router = require('express').Router();
const pool = require('../db')
const validation = require('../utils/validation')
const search = require('../utils/search')

// API create a new user
// *** move to index.js temporarily***

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
    
    const { id } = req.query;
    const user_exist = await search.searchById(id);
    if(user_exist){
        const q = 'SELECT * FROM user WHERE id = ?';
        const [rows, fields] = await pool.execute(q, [id]);
        const date = res.get('Request-Date');
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
        console.log(id)
        res.status(400).json(`Client Response Error (User doesn't exist)`)
    }
})

module.exports = router;