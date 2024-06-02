import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Input, Button} from './index'
import {useForm} from 'react-hook-form'
import {login as authLogin} from '../store/auth'
import logo from '../img/Instagram.png'
import './component.css'
export default function Signup() {
  const {handleSubmit, register} = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState("")

  const create = async(data)=>{
    setError("")
  try {
    const userData = await authService.createAccount(data)
    if(userData){
     const userData = await authService.getCurrentUser()
     if(userData){
      dispatch(authLogin(userData))
      navigate('/home')
     }
    }
  } catch (error) {
    setError(error.message)
  }
  }
  return (
   <form className='login-cont' onSubmit={handleSubmit(create)}>
    <div className='logo'><img src={logo}/></div>
    <div>
      <p className='signup-para'> Create your Account</p>
    </div>
    <div className='name'>
      <Input className="input"
      label = "Name"
      placeholder = "Enter your Name"
      type = "text"
      {...register("name", {
        required: true
      })}
      />
    </div>
    <div className='name'>
    <Input className="input"
                label = "Email"
                placeholder = "Enter your email"
                type = "email"
                {...register("email",{
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
    </div>
    <div className='name'>
    <Input   className="input"
                label = "Password"
                placeholder = "Enter your password"
                type = "password"
                {...register("password",{
                    required: true,

                })}
                />
    </div>
    {error && <p>{error}</p>}
   <Button className="btn B"
   children={"Signup"}
   type="submit"
   />
  <p className='signup-para'>Already have an Account</p>
  <Link className='link'
  to={"/"}
  >Login</Link>

  
   </form>
  )
}
