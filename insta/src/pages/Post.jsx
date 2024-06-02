import React, { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import service from '../appwrite/config'
import {Container,PostCard} from '../components/index'

export default function Post() {
    const {slug} = useParams()
    const navigate = useNavigate()
    const [post, SetPost ] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (slug) {
                    const post = await service.getPost(slug);
                    SetPost(post);
                } else {
                    navigate("/home");
                }
            } catch (error) {
                console.log("Error fetching post:", error);
            }
        };
    
        fetchData();
    
       
    }, [slug, navigate]);
    
  return (
    <Container>
        {post && <PostCard {...post}/> }
    </Container>
  )
}
