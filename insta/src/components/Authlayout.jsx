import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Authlayout({children, authentication=true}) {
    const [loader, setloader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state=>state.auth.status)

    useEffect(() => {
      
        if(authentication && authStatus !== authentication){
            navigate("/")
        } else if(!authentication && authStatus !== authentication){
            navigate("/home")
        }
        setloader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}