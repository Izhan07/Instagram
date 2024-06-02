import React from 'react'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'
import './component.css'


export default function UserPosts() {
    const [posts,setPosts] = useState([])
    const userData = useSelector((state)=> state.auth.userData)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const posts = await service.getPosts([]);
          setPosts(posts.documents);
        } catch (error) {
          
          console.error('Error fetching posts:', error);
        }
      };
    
      fetchData();
    
     
    }, []);
  return (
    <div className='profile-posts-cont'>
         {posts && 
         posts.map((post)=>
       (post.userId === userData.$id)? <div  key={post.slug}>
       <div  className='profile-post'>  <Link to={`/post/${post.slug}`}><img src={service.getFilePreview(post.featuredImage)} /></Link></div> 
       </div>: null
        )
         }
    </div>
  )
}
