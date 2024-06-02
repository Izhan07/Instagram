import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {Input, Button} from './index'
import {useForm} from 'react-hook-form'
import {login as authLogin} from '../store/auth'
import logo from '../img/Instagram.png'
import './component.css'

export default function Login() {
    const {handleSubmit, register} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const  login= async(data)=>{
   try {
    const session = await authService.login(data)
    if(session){
        setError("")
        const userData = await authService.getCurrentUser()
        console.log(userData)
    if(userData){
        dispatch(authLogin(userData))
       navigate("/home")
    }
    
    }
   } catch (error) {
    setError(error.message)
   }
    }
  return (
    <form className='login-cont' onSubmit={handleSubmit(login)}>
        
        <div className="login">
        <div className="logo"><img src={logo}/></div>
            <div >
                <p className='login-para'> Login to Your Account</p>
            </div>
            <div className='email'>
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
            <div className="password">
                <Input  className="input"
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
            children={"Login"}
            type="submit"

            />
            <p className='login-para'>Don't have an Account</p>
            <Link className='link' to={"/signup"}>
            Signup
            </Link>
        </div>
    </form>
  )
}
