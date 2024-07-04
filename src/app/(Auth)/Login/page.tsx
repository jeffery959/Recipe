'use client'
import React from 'react'
import Image from 'next/image'
import '../auth.css'
import { useRouter } from 'next/navigation'
import {useState} from 'react'
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'
import { base_route } from '@/app/api/db'
import { useGlobalContext } from '@/app/Context/store'
import LoadingButton from '@mui/lab/LoadingButton';
import { handleUserValue } from '../../../Jeffery-Library/react'
import { CircularProgress } from '@mui/material'
const Login = () => {
  const router =useRouter()
  const [user,setUser]=useState({Email:"",Password:""})
  const {login,setLogIn,setlogedUser}:any=  useGlobalContext()
 const [loading,setLoading]=useState(false)

  const loginUser=async()=>{
    //Check if All fields are compeleted
    setLoading(true)
    if(!user.Email||!user.Password){
    toast.error('Compelete all fields')
    setLoading(false)
    return
  }
  if(user.Password.length<8){
      setLoading(false)
      toast.error('Invalid password')
      return
    }
    
    
    await axios.post(`${base_route}api/Login`,user)
    .then((response)=>{toast.success(response.data.msg); 
    
      setLogIn(true) 
      setlogedUser(response.data.user)
      localStorage.setItem("Login",JSON.stringify(true))    
      localStorage.setItem("User",JSON.stringify(response.data.user))    
      setTimeout(()=>{
        router.push('/')
      },1500)
    })
    .catch((err)=>{toast.error(err.response.data.msg)
    setLoading(false)})
      }
  return ( <div className='w-screen h-screen Auth_bg flex justify-center items-center'>
    <Toaster/>
<Image src={'/Images/LogIn_bg.png'} className='w-full h-full object-cover' width={800} height={800} alt=''/>
<div className='absolute  top-56 Frame_auth bg-white flex'>
  <div className='w-1/2 hidden md:block '>
<Image src={'/Images/LogIn_bg.png'} className='w-full rounded-l-xl h-full object-cover' width={800} height={800} alt=''/>
<div className='Login-Img '>

<p className='w-full text-3xl font-bold text-white text-center'>Welcome</p>
<p className='w-full text-3xl font-medium mt-12 text-white text-center'>Please sign in to access your account.</p>
</div>

  </div>
  <div className='w-full md:w-1/2 mt-10'>
<p className='w-full text-center text-3xl text-Gray-Bold font-bold mb-8'>Login</p>
<div className='w-full px-2 '>
<input type="text" name="Email" onChange={(e)=>handleUserValue(e,user,setUser)}  value={user.Email} placeholder='Email' className='w-full outline-primary  px-4 mb-4 rounded-lg py-2 bg-gray-100'/>
  <input type="text" name="Password" onChange={(e)=>handleUserValue(e,user,setUser)}  value={user.Password} placeholder='Password' className='w-full outline-primary  px-4 py-2 rounded-lg bg-gray-100'/>
<LoadingButton onClick={()=>loginUser()}   loading={loading} className='w-full hover:bg-primary px-4 py-2 rounded-lg bg-primary text-white mt-10 '>
  Login
</LoadingButton>
</div>

<div className='w-full mt-2'>
  <p className='text-Gray-SubBold font-medium text-sm px-2'>Dont have an account?<span className='hover:underline cursor-pointer'  onClick={()=>router.push('/SignUp')}>Signup</span></p>

</div>
  </div>
</div>
    </div> 
    
   
  
  )
}

export default Login