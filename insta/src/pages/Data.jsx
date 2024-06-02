import React from 'react'
import { useSelector } from 'react-redux'
import authService from '../appwrite/auth'

export default function Data() {
const loaderData = async()=>{
    try {
     const data = authService.getCurrentUser()
       if(data){
        return data
       }
    } catch (error) {
        throw error
    }
}
    
  return (
    {loaderData}
  )
}
