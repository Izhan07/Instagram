import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import service from '../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import {Input, Button} from './index'
import image from '../img/image.png'
import logo from '../img/Instagram.png'
import './component.css'

export default function Addpost() {
    const navigate = useNavigate()
    const {handleSubmit, register} = useForm()
    const userData = useSelector((state)=> state.auth.userData)
   

    const createPost = async(data)=>{
      const id = nanoid();
      
        const file = await service.uploadFile(data.image[0])
        if(file){
          const  fileId = file.$id
          data.featuredImage = fileId
        }
        const dbPost = await service.createPost({
            
            slug: id,
            ...data,
            userId: userData.$id
    })
        if(dbPost){
            navigate(`/post/${dbPost.$id}`)
            
        }
    }
  return (
    <form className='create-post-cont' onSubmit={handleSubmit(createPost)}>
      <div className='logo'><img src={logo}/></div>
      <div className='image-input'> <img src={image}/> <Input className="img-input"
       placeholder ="Upload Image"
       type = "file"
       accept="image/png, image/jpg, image/jpeg, image/gif"
       {...register("image", {
        required: true
       })}
       /></div>
      <div className='disc-input'> <Input className="disc"
       type ="text"
       placeholder = "Discription"
       {...register("content", {
        required: false
       })}
       /></div>
       <Button className='btn B'
       children={"Post"}
       type="submit"
       />
    </form>
  )
}
