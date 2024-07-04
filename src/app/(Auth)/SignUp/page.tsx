"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import '../auth.css'
import {useState} from "react"
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'
import { handleUserValue } from '../../../Jeffery-Library/react'
const SignUp = () => {
  const router = useRouter()
  const [user,setUser]=useState({FirstName:'',LastName:'',Email:"",Password:""})
  const [repeatPass,setRepeatPass]=useState("") 
 
  const signupUser=async()=>{
//Check if All fields are compeleted
if(!user.FirstName||!user.LastName||!user.Email||!user.Password||!repeatPass){
toast.error('Compelete all fields')
return
}
if(user.Password.length<8){
  toast.error('Password length must be a minimum of 8 characters')
  return
}
if(repeatPass!==user.Password){
  toast.error('Repeat Password must match')
  return
}

await axios.post('http://localhost:3000/api/Otp',user)
.then((response)=>{router.push('/Otp'); localStorage.setItem("Email",user.Email)})
.catch((err)=>toast.error(err.response.data.msg))
  }
  return ( <div className='w-screen h-screen Auth_bg flex justify-center items-center'>
    <Toaster/>
<Image src={'/Images/LogIn_bg.png'} className='w-full h-full object-cover' width={800} height={800} alt=''/>
<div className='absolute  top-56 Frame_auth bg-white flex'>
  <div className='w-1/2 hidden md:block '>
<Image src={'/Images/LogIn_bg.png'} className='w-full rounded-l-xl h-full object-cover' width={800} height={800} alt=''/>
<div className='Login-Img '>

<p className='w-full text-3xl font-bold text-white text-center'>New User?</p>
<p className='w-full text-3xl font-medium mt-12 text-white text-center'>Please signup to get access to other features.</p>
</div>

  </div>
  <div className='w-full md:w-1/2 mt-4'>
<p className='w-full text-center text-3xl text-Gray-Bold font-bold mb-8'>Signup</p>
<div className='w-full px-2 '>
<div className='w-full flex gap-2'>

  <input type="text" name="FirstName" onChange={(e)=>handleUserValue(e,user,setUser,setRepeatPass)} value={user.FirstName} placeholder='FirstName' className='w-1/2 px-4 mb-4 outline-primary rounded-lg py-2 bg-gray-100'/>
  <input type="text" name="LastName" onChange={(e)=>handleUserValue(e,user,setUser,setRepeatPass)}  value={user.LastName} placeholder='LastName' className='w-1/2 px-4 mb-4 outline-primary  rounded-lg py-2 bg-gray-100'/>
</div>
  <input type="text" name="Email" onChange={(e)=>handleUserValue(e,user,setUser,setRepeatPass)}  value={user.Email} placeholder='Email' className='w-full outline-primary  px-4 mb-4 rounded-lg py-2 bg-gray-100'/>
  <input type="text" name="Password" onChange={(e)=>handleUserValue(e,user,setUser,setRepeatPass)}  value={user.Password} placeholder='Password' className='w-full outline-primary  px-4 mb-4 py-2 rounded-lg bg-gray-100'/>
  <input type="text" name="RepeatPassword" value={repeatPass} onChange={(e)=>handleUserValue(e,user,setUser,setRepeatPass)} placeholder='Repeat password' className='w-full outline-primary  px-4 py-2 rounded-lg bg-gray-100'/>

<button onClick={()=>signupUser()} className='w-full px-4 py-2 rounded-lg bg-primary text-white mt-6 '>Signup</button>
</div>

<div className='w-full mt-2'>
  <p className='text-Gray-SubBold font-medium text-sm px-2'>Already have an Account?<span className='hover:underline cursor-pointer' onClick={()=>router.push('/Login')}>Login</span></p>

</div>
  </div>
</div>
    </div> 
    
   
  
  )
}

export default SignUp