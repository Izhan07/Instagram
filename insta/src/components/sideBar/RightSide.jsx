import React from 'react'
import { useSelector } from 'react-redux'
import {Logout} from '../index'
import service from '../../appwrite/config'
import './sideBar.css'
import authService from '../../appwrite/auth'
import { useState,useEffect } from 'react'

export default function RightSide() {
  const [userData, setUserData] = useState()
 
  const data = async()=>{
    const user = await authService.getCurrentUser()
    .then(user=> setUserData(user))
  }
  useEffect(()=>{
    data()
  },[])
  
    
  return (
    <>
    <div className='right'>
        {userData && <div className='rightBar'>
        <img src={service.getFilePreview(userData.$id)}/>
        <p>{userData.name}</p>
   <Logout className="log-btn "/>
    </div>
        }
    </div>
    </>
  )
}
