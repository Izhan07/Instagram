import React from 'react'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import service from '../appwrite/config'
import {PostCard} from './index'
import './homepost.css'

export default function HomePosts() {
  const [posts,setPosts] = useState([])
  
 

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
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className='home-posts' key={post.slug}>
            <PostCard {...post} />
          </div>
        ))
      ) : (
        <div className='home-posts'>
          <h1>Add Posts</h1>
         
        </div>
      )}
    </div>
  )
}
