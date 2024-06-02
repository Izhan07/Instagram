import React,{useState, useEffect} from 'react'
import service from '../appwrite/config'
import { useSelector } from 'react-redux'
import {Button, Input} from './index'
import { useForm } from 'react-hook-form'
import {Logout} from '../components/index'
import './component.css'

export default function ProfileCard() {
    const userData = useSelector((state)=> state.auth.userData)
    const dp_id = userData ? userData.$id : null; 
    const [file, SetFile] = useState(() => localStorage.getItem('file') || "");
    
    const {handleSubmit, register} = useForm()

    useEffect(() => {
    
      const storedFile = localStorage.getItem('file');
      if (storedFile) {
          SetFile(storedFile);
      }
  }, []);

    
   
    const dp = async(data)=>{
        const uploaded = await service.uploadPic(data.image[0], dp_id)
        if(uploaded){
          setdp(true)
          SetFile(dp_id) 
          localStorage.setItem('file', data.image[0]);
        }
    }
   
  return (
    <div className='profile-card'>
   <div className='dp'><img src={service.getFilePreview(dp_id)}/></div>
       
        <form onSubmit={handleSubmit(dp)}>
          
       
        {file?<div className='p-content'><div className='p-btn'>
        {userData && <h2>{userData.name}</h2>}
           <Button className="btn" children={"Edite Profile"}/> 
           <Logout className="btn"/>
         </div>
        
         <div className='p-data'><p><b>4</b>posts</p> <p><b>93</b>followers</p><p><b>164</b>following</p></div> </div> :<div>  {userData && <h2>{userData.name}</h2>}
         <div className='p-content'> <div className='p-btn'> <Input className="btn"
        placeholder = "Add Profile picture"
        type = "file"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image",{required:true})}
        
        /> <button className='btn' type='submit'>Add</button> </div></div></div>}
       </form>
    </div>
  )
}
