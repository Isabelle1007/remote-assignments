// const { create } = require('./user.service')
// const { response } = require('express');
const pool = require('./db')

function pw_validation(pw){
    
    let check = 0;
    if (/[A-Z]/.test(pw)) {
        check += 1;
    }
    if (/[a-z]/.test(pw)) {
        check += 1;
    }
    if (/[0-9]/.test(pw)) {
        check += 1;
    }
    if (/[|/?.>,<'";:|]}[{=+-_)(*&^%$#@ !`~]/.test(pw))  {
        check += 1;
    }

    if(check >= 3)
        return true
    else
        return false
}

function email_validation(email){
    console.log(email)
    email = JSON.parse(email)
    pool.query(
        'select * from user where email = ?',
        [email],
        (err, results, fields) => {
            // console.log(results.length)
            if(err){
                console.log(err);
                return false
            }
            if(results.length > 0)
                return false
            else
                return true
        }
    )
}

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        const email_exist = false
        pool.query(
            'select * from user where email = ?',
            [body.email],
            (err, results, fields) => {
                // console.log(results.length)
                if(err){
                    console.log(err);
                    res.status(500).json({
                        message: "Database Connection Error."
                    })
                    return;
                }

                if(results.length > 0)
                    email_exist = true;
            }
        )

        if(!email_exist){
            if(pw_validation(body.password)){
                pool.query(
                    'insert into user(name, email, password) values(?,?,?)',
                    [
                        body.name,
                        body.email,
                        body.password,
                    ],
                    (err, results, fields) => {
                        if(err){
                            console.log(err);
                            res.status(500).json({
                                message: "Database connection error"
                            });
                            return;
                        }
                        console.log('User created successfully')
                        pool.query(
                            'select * from user where email = ?',
                            [body.email],
                            (err, results, fields) => {
                                if(err){
                                    console.log(err);
                                    res.status(500).json({
                                        message: "Database Connection Error."
                                    });
                                    return;
                                }
                                // console.log(results)
                                res.status(200).json({
                                    'data': {
                                        'user':{
                                            'id': results[0].id,
                                            'name': results[0].name,
                                            'email': results[0].email
                                        },
                                        'date': results[0].created
                                    }
                                })
                                return;
                            }      
                        )
                    }
                );
            }else{
                console.log('Invalid password')
                res.status(400).json({
                    'message': "Client Error Response. (Invalid Password)"
                })
                return;
            }
        }else{
            res.status(403).json({
                'message': "Email Already Exists."
            });
        }  
    },
    getUserById: (req, res) => {
        const id = req.body.id;
        // console.log(body)
        pool.query(
            'select * from user where id = ?',
            [id],
            (err, results, fields) => {

                if(err){
                    console.log(err)
                    res.status(500).json({
                        'message': "Database Connection Error"
                    });
                    return;
                }

                if(results.length == 0){
                    console.log('No user exists with this id')
                    res.status(403).json({
                            'message': "User Not Existing"
                    });
                    return;
                }
                
                res.status(200).json({
                    'data': {
                        'user':{
                            'id': results[0].id,
                            'name': results[0].name,
                            'email': results[0].email
                        },
                        'date': results[0].created
                        }
                })
            }
        );
    },
    // getUsers: (req, res) => {
    //     pool.query(
    //         'select * from user',
    //         [],
    //         (err, results, fields) => {
    //             // console.log(results)
    //             if(err){
    //                 console.log(err)
    //                 res.status(500).json({
    //                     'message': "Database Connection Error"
    //                 });
    //             }else{
    //                 res.status(200).json({
    //                     'data': results 
    //                 })
    //             }
    //         }
    //     );
    // },
}