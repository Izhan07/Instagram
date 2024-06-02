import React,{useState, useEffect} from 'react'
import service from '../appwrite/config'
import { useSelector } from 'react-redux'
import './component.css'
import notification from '../img/notification.png'
import comment from '../img/comment.png'
import share from '../img/share.png'
import save from '../img/save.png'
import authService from '../appwrite/auth'



export default function PostCard({featuredImage,content}) {
const [userData, setUserData] = useState()
const [expanded, setExpanded] = useState(false);

const toggleExpanded = () => {
  setExpanded(!expanded);
};
const data = async()=>{
  const user = await authService.getCurrentUser()
  .then(user=> setUserData(user))
}
useEffect(()=>{
  data()
},[])

  return (
    <div  className={`post-card-cont ${expanded? 'maxheight' : ""}`}>
      {userData && <div className='post-dp'> <img src={service.getFilePreview(userData.$id)} alt='dp'/>
        <p>{userData.name}</p></div>} 
       <div className='post-card-img'><img src={service.getFilePreview(featuredImage)}/></div>
       <div className='post-icons'>
        <img src={notification}/> 
        <img src={comment}/>
        <img src={share}/>
        <div className='save'> <img src={save}/></div></div>
      <div className='post-content'> <div className='content-p'> <p>{content}</p> </div>{content.length > 3 && ( 
       <div className='content-b'> <button className='content-btn' onClick={toggleExpanded}>
          {expanded ? 'View Less' : 'View More'}
        </button></div>
      )}</div>
     
    </div>
  )
}

