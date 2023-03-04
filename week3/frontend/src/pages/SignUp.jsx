import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api'

const SignUp = () => {

    const [user, setUser] = useState({
        name: "", 
        email: "", 
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async (e) => {
        e.preventDefault()
        console.log(user)
        try{
            await axios.post('/users', user)
            navigate('/users')
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <div className="form">
                <h1>Sign Up</h1>
                <input type="text" placeholder="name" onChange={handleChange} name="name"></input>
                <input type="email" placeholder="email" onChange={handleChange} name="email"></input>
                <input type="password" placeholder="password" onChange={handleChange} name="password"></input>
                <button onClick={handleClick}>Sign Up</button>
            </div>
            <button><Link to='/users'>View All Users</Link></button>
        </div>
        
    )
}

export default SignUp