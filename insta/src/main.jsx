import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {CreatePost,Explore,Home,LoginPage,Post,Profile,SignupPage} from './pages/index.js'
import {store} from "./store/store.js"
import { Provider } from 'react-redux'
import Authlayout from './components/Authlayout.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"/",
        element: 
        <Authlayout authentication={false}>
          <LoginPage/>
          </Authlayout>
        
      },
      {
    
      path:"/home",
    
      element:
      <Authlayout authentication>
        <Home/>
        </Authlayout>
      },
      {
        path:"/signup",
        element:
       <Authlayout authentication={false}>
          <SignupPage/>
          </Authlayout>
      },
      {
        path:"/create-post",
        element:
      <Authlayout authentication>
          <CreatePost/>
          </Authlayout>
      },
      {
        path:"/home/explore",
        element:
        <Authlayout authentication>
          <Explore/>
          </Authlayout>
      },
      {
        path:"/post/:slug",
        element:
        <Authlayout authentication>
          <Post/>
          </Authlayout>
      },
      {
        path:"/profile",
        element:
        <Authlayout authentication>
          <Profile/>
          </Authlayout>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
   <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
