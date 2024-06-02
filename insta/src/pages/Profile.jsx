import React from 'react'
import {ProfileCard,UserPosts, Container} from '../components/index'

export default function Profile() {
  return (
    <Container className="profile-cont">
       
            <ProfileCard/>

       
       
            <UserPosts/>
       
    </Container>
  )
}
