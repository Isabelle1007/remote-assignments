// const { create } = require('./user.service')
// const { response } = require('express');
const emailValidator = require('deep-email-validator');
const pool = require('./db')

// async function email_exist_check(e){
//     try{
//         const results = await pool.query('select * from user where email = ?',[e])
//         if(results[0].length > 0)
//             return true;
//         else
//             return false;
//     }catch(err){
//         console.log(err);
//         res.status(500).json({
//             message: "Database Connection Error."
//         })
//     }
// }
        
function pw_validation(pw){
    
    let check = 0;
    if (/[A-Z]/.test(pw)) check += 1;
    if (/[a-z]/.test(pw)) check += 1; 
    if (/[0-9]/.test(pw)) check += 1;
    if (/[|/?.>,<'";:|]}[{=+-_)(*&^%$#@ !`~]/.test(pw)) check += 1;
    
    if(check >= 3) 
        return true
    else 
        return false
}

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

// function email_validation(e){
//     var mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if(e.value.match(mailformat))
//         return true
//     else
//         return false
// }

module.exports = {
    createUser: (req, res) => {
        const body = req.body;

        // const email_exist = email_exist_check(body.email)

        const email_exist = false

        console.log('e?', email_exist)
        
        pool.query(
            'select * from user where email = ?',
            [body.email],
            (err, results, fields) => {

                console.log(results.length)

                if(err){
                    console.log(err);
                    res.status(500).json({
                        message: "Database Connection Error."
                    })
                    return;
                }

                console.log('results:',results)

                if(results.length > 0)
                    email_exist = true;
            }
        )

        console.log('email exists?', email_exist)

        if(!email_exist){
            if(pw_validation(body.password) && isEmailValid(body.email)){
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
                // const type = -1;
                // if(email_validation(body.email))
                //     type = 1 // invalid password
                // else if(pw_validation(body.password))
                //     type = 2 // invalid email
                // else
                //     type = 3 // both invalid

                // if(type == 1)
                // {
                //     console.log('Invalid password')
                //     res.status(400).json({
                //         'message': "Client Error Response. (Invalid Password)"
                //     })
                //     return;
                // }

                // if(type == 2){
                //     console.log('Invalid email')
                //     res.status(400).json({
                //         'message': "Client Error Response. (Invalid E-mail)"
                //     })
                //     return;
                // }

                console.log('Invalid email & password')
                res.status(400).json({
                    'message': "Client Error Response. (Invalid E-mail & Password)"
                })
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
                
                console.log(`get user with id ${id}`)
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