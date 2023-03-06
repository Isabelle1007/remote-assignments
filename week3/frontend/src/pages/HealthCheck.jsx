import React, { useEffect, useState} from "react";
import axios from '../api'
import './style.css'

const HealthCheck = () => {

    const [msg, setMsg] = useState()

    useEffect(() => {
        fetch()
    }, []);

    const fetch = async () => {
        try{
            const res = await axios.get('/healthcheck')
            // console.log(res)
            setMsg(res.data)
        }catch(err){
            console.log(err)
            setMsg(err.response.data)
        }
    }

    return(
        <div>
            <div align='center'>
                <p>{JSON.stringify(msg)}</p>
            </div>
        </div>
    )
}

export default HealthCheck