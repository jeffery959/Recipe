'use client'
import React from 'react'
import Image from 'next/image'
import '../auth.css'
import { useRouter } from 'next/navigation'
import {useState} from "react"
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'
const Login = () => {
  const router =useRouter()
  const [Otp,setOtp]=useState("")
  const VerifyOtp=async()=>{
    if(Otp===''){
        toast.error("Fill Otp")
        return
    }
    if(Otp.length<4){
        toast.error("Invalid Otp")
        return
    }
    const Email= localStorage.getItem("Email")

    axios.post('http://localhost:3000/api/Register',{Email,otp:Otp})
   .then((response)=>{toast.success(response.data.msg);setTimeout(()=>{
    router.push('/Login')
    },4000)})
   .catch((error)=>toast.error(error.response.data.msg))

  }
  return ( <div className='w-screen h-screen Auth_bg flex justify-center items-center'>
     <Toaster/>
<Image src={'/Images/LogIn_bg.png'} className='w-full h-full object-cover' width={800} height={800} alt=''/>
<div className='absolute  top-56 Frame_auth bg-white flex'>

  <div className='w-full mt-10'>
<p className='w-full text-center text-3xl text-Gray-Bold font-bold mb-8'>OTP</p>
<div className='w-full px-2 '>
  <input type="number"  value={Otp} onChange={(e)=>setOtp(e.target.value)} placeholder='4-digit code' className='w-full outline-primary  px-4 mb-4 rounded-lg py-2 bg-gray-100'/>


<button onClick={()=>VerifyOtp()} className='w-full px-4 py-2 rounded-lg bg-primary text-white mt-10 '>Verify</button>
</div>


  </div>
</div>
    </div> 
    
   
  
  )
}

export default Login