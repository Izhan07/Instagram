import React from 'react'
import {useSelector} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import { useState,useEffect } from 'react'
import Container from '../container/Container'
import service from '../../appwrite/config'
import logo from '../../img/Instagram.png'
import create from '../../img/create.png'
import explore from '../../img/explore.png'
import home from '../../img/home.png'
import message from '../../img/message.png'
import notification from '../../img/notification.png'
import reels from '../../img/reels.png'
import search from '../../img/search.png'
import './sideBar.css'
import authService from '../../appwrite/auth'
import logo2 from '../../img/instaLogo.png'


export default function SideBar() {
    const navigate = useNavigate()
    const authStatus = useSelector((state)=> state.auth.status)
    const [userData, setUserData] = useState()
    const data = async()=>{
      const user = await authService.getCurrentUser()
       .then(user=> setUserData(user))
    }
    useEffect(()=>{
      data()
    },[])
    
    const sideBarItems =[
        {
          name: "Home",
          slug: "/home",
          src: home
        },
        {
          name:"Search",
          src: search
        },
        {
          name: "Explore",
          slug: "/home/explore",
          src: explore
        },
        {
          name: "Reels",
          src: reels
        },
        {
          name:"Messege",
          src: message
        },
        {
          name:"Notification",
          src: notification
        },
        {
          name:"Create",
          slug:"/create-post",
          src: create
        }
    ]
    
  return (
   <Container className="sideBar">
    <div className='logo-box'>
      <img className='img1' src={logo}/> <img className='img2' src={logo2}/>
    </div>
    <div className='side-items'>
   <ul className='side-bar-list'>
  {authStatus? 
  sideBarItems.map((item)=>
  <Link className='link' key={item.name} to={item.slug}> 
  <li className='lists'>
 <img src={item.src}/>
 <p>{item.name}</p>
  </li>
  </Link> 
  )
  
  : null}
 {userData && <Link className='link' to={"/profile"}> <li className='lists list-img' ><img src={service.getFilePreview(userData.$id)}/> <p>Profile</p></li></Link>}
   </ul>
   </div>
   </Container>
  )
}
