import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import SideBar from './components/sideBar/SideBar'
import './App.css'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/auth'
import {login} from './store/auth'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
      
    }
      
  )
  .finally(()=> setLoading(false))
  },[])
  return !loading? (<div className='app-cont'>
    <SideBar/>
    <Outlet/>
  
  </div>) : null
  
}

export default App
