import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import axios from '../api'
import './style.css'
import queryString from 'query-string';

const User = () => {

    const { search } = window.location;
    const { id } = queryString.parse(search);

    useEffect(() => {
        fetchUserById();
    }, []);

    const [msg, setMsg] = useState()

    const fetchUserById = async () => {
        try{
            const res = await axios.get(`/users?id=${id}`)
            console.log(res.data.data.user)
            setMsg(res.data.data.user)
        }catch(err){
            console.log(err)
            setMsg(err.response.data)
        }
    }

    return(
        <div>
            <div align='center'>
                <h1> User with ID {id}</h1>
                <div className="user" >
                    <p>{JSON.stringify(msg)}</p>
                </div>
                <button><Link to='/'>Back to Sign Up Page</Link></button>
            </div>
            
        </div>
    )
}

export default User