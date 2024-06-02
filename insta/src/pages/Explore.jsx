import React, { useEffect } from 'react'
import service from '../appwrite/config'
import Container from '../components/container/Container'
import { useState } from 'react'
import './pages.css'

export default function Explore() {
    const [posts, SetPosts] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const posts = await service.getPosts([]);
          SetPosts(posts.documents);
        } catch (error) {
          
          console.error('Error fetching posts:', error);
        }
      };
    
      fetchData();
    
     
    }, []);
  return (
    <Container className="all-posts-cont">
        {posts && 
            posts.map((post)=><div className='all-post' key={post.$id}>
             <img src={service.getFilePreview(post.featuredImage)}/>
            </div>)
            }
    </Container>
  )
}
