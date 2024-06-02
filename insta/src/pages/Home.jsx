import React from 'react'
import {SideBar,HomePosts,RightSide,Container} from '../components/index'
import './pages.css'
import { useSelector } from 'react-redux'

export default function Home() {
  const userData = useSelector((state)=> state.auth.userData)
  return (
    <Container className="home">
        <div className='main-cont'>
            <HomePosts/>

            <RightSide/>
        </div>
    </Container>
  )
}
