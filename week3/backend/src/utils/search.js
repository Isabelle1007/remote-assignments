const pool = require('../db')

async function searchById(id){
    const q = 'SELECT * FROM user WHERE id = ?';
    const [rows, fields] = await pool.execute(q, [id]);
    if(rows.length > 0)
        return true
    else
        return false
}

async function searchByName(n){
    const q = 'SELECT * FROM user WHERE name = ?';
    const [rows, fields] = await pool.execute(q, [n]);
    if(rows.length > 0)
        return true
    else
        return false
}

async function searchByEamil(e){
    const q = 'SELECT * FROM user WHERE email = ?';
    const [rows, fields] = await pool.execute(q, [e]);
    if(rows.length > 0)
        return true
    else
        return false
}

module.exports = { searchById, searchByName, searchByEamil }