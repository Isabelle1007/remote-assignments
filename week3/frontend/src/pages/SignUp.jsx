import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api'
import './SignUp.css'

export default function SignUp({}){

    const [user, setUser] = useState({
        name: "", 
        email: "", 
        password: ""
    })

    const [msg, setMsg] = useState()

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('/users', user)
            setMsg(response.data.data.user)
            // navigate('/users')
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <div align='center' >
                <h1> Sign Up</h1>
                <div className='input_form' >
                    <input type="text" placeholder="name" value={user.name} onChange={handleChange} name="name" />
                    <input type="email" placeholder="email" value={user.email} onChange={handleChange} name="email"></input>
                    <input type="password" placeholder="password" value={user.password} onChange={handleChange} name="password"></input>
                </div>
                <button onClick={handleClick}>Sign Up</button>
                <p>{JSON.stringify(msg)}</p>
            </div>
            {/* <button><Link to='/users'>View All Users</Link></button> */}
        </div>
    )
}