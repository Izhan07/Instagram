import React from 'react'
import { useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {logout} from '../store/auth'
import { useNavigate } from 'react-router-dom'

export default function Logout({
  className,
}) {
   const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler =async ()=>{
      await authService.logout()
        .then(()=> dispatch(logout()))
        navigate("/")
         
    }
  return (
    <div><button className={`${className}`} onClick={logoutHandler}>
        Logout
        </button></div>
  )
}
