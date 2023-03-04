import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../api'

const Users = () => {

    const [users, setUsers] = useState([]);

    const fetchAllUsers = async () => {
        try{
            const res = await axios.get('/users/all')
            console.log(res.data)
            setUsers(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllUsers()
        console.log(users)
    }, [])

    return(
        <div>
            <button><Link to='/'>Sign Up</Link></button>
            <h1>All Users</h1>
            <div className="users">
                {
                    users.map((user, id) => (
                        <div className="user" key={user.id}>
                            <p>{user.id}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <p>{user.password}</p>
                            <p>-------------------------------</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Users