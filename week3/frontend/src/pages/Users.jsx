import React, { useEffect, useState} from "react";
import { Link, useParams } from 'react-router-dom';
import axios from '../api'
import './style.css'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState()

    const fetchAllUsers = async () => {
        try{
            const res = await axios.get('/users/all')
            // console.log(res.data)
            setUsers(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllUsers()
        // console.log(users)
    }, [])

    return(
        <div>
            <div align='center'>
                <h1> View All Users</h1>
                <button><Link to='/'>Back to Sign Up</Link></button>
                <div className="users" align='start' >
                {
                    users.map((user, id) => (
                        <div className="user" key={`user-${id}`}>
                            {/* <h3>NO.{id + 1}</h3> */}
                            <p>ID: {user.data.user.id}/ Name: {user.data.user.name}/ Email: {user.data.user.email}</p>
                        </div>
                    ))
                }
                </div>
            </div>
            
        </div>
    )
}

export default Users