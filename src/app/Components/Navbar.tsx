'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconButton } from '@mui/material'
import { RouteActive } from '../../Jeffery-Library/next'

import { toggleEvent } from '../../Jeffery-Library/react'
import './Navbar.css'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MenuIcon from '@mui/icons-material/Menu';
import { useGlobalContext } from '../Context/store'
import { base_route } from '../api/db'

import { setCookie,getCookie } from 'cookies-next';

const Navbar = () => {
  const {login,setLogIn,setlogedUser,logedUser}:any=  useGlobalContext()
const [mobileToggle,setMobileToggle]=useState<boolean>(false);
const ShrtName=logedUser?.FirstName?.split('')[0]+logedUser?.LastName?.split('')[0]
    const navigation=[{route:'',name:'Home'},{route:'Recipe',name:'Recipe'},{route:'AboutUs',name:'AboutUs'},{route:'Contact',name:'Contact'}]
    const [isScroll,setisScroll]=useState(true)
    const CheckScroll=()=>{
    
        if(window.scrollY<60){
         
      
          setisScroll(true)
        

        }else{

          setisScroll(false)
        }
      
  
      
    
  
    }
    useEffect(()=>{
const token = getCookie("token")
      if(!token){

        setLogIn(false)
        localStorage.setItem('Login',"false")
        window.addEventListener('scroll',CheckScroll)
      }
      return()=>{
  
        window.removeEventListener('scroll',CheckScroll)
      }
      
  
      
  
    })
    useEffect(()=>{
      const getString=localStorage.getItem('Login')
      const getUser=localStorage.getItem('User')
      const newlogedUser = JSON.parse(getUser!)
      const newlogin=JSON.parse(getString!)
      setLogIn(newlogin)
      setlogedUser(newlogedUser)
    },[])
    const router = useRouter()
  return (

    <div className={`fixed ${RouteActive('/')&&isScroll?'bg-none sm:bg-white':RouteActive('/Contact')&&isScroll?'bg-none':'bg-white'} duration-300   px-2 2xl:px-64 sm:px-8 md:px-8 lg:px-24 z-40 w-full font-medium  sm:text-gray-600 text-white  py-8 flex xs:justify-between items-center ${login?'justify-between':'justify-center'} `}>
     
        <div className={`z-30 ${RouteActive('/')&&isScroll?'':'text-gray-600'}    flex lg:w-1/2 sm:w-2/3   items-center px-4 sm:p-0  py-2 rounded-3xl xs:justify-between justify-center border sm:border-none ${RouteActive('/Contact')&&isScroll?"text-white":''}`}>
          
            <h5 className='text-2xl font-bold  '>Recipe</h5>
            <div className={`bg-white sm:bg-transparent border flex sm:flex-row flex-col w-44 sm:w-4/5 xs:mt-44 ${login?"mt-44 left-5 ":"mt-56 xs:left-5 "} rounded-lg sm:mt-0 absolute px-5  sm:relative sm:justify-between sm:shadow-none sm:border-0 shadow-md py-2 ${mobileToggle?'':'hidden sm:flex'}`}>
            
              {
                navigation.map((itm:{route:string,name:string},key)=><Link key={key} href={base_route+itm.route} className={`${RouteActive('/'+itm.route)?'text-primary':RouteActive('/Contact')&&isScroll?"sm:text-white  text-gray-600":'text-gray-600'} `}>{itm.name}</Link>)
              }
              {!login&&<div className='xs:hidden text-gray-600'>
                <p>SingUp</p>
                <p>Login</p>
              </div>}

            </div>   
            <IconButton onClick={()=>toggleEvent(mobileToggle,setMobileToggle)}>
              <MenuIcon  className={`${RouteActive('/')&&isScroll||RouteActive('/Contact')&&isScroll?'text-white':'text-gray-600'} object-contain   w-5 h-5 sm:hidden`} />
              </IconButton>            

        </div>
        
              
          {login? <div style={{background:logedUser.Color}} onClick={()=>router.push('/User')} className='w-10 h-10 rounded-full  flex justify-center items-center text-white cursor-pointer'>
          <p >{ShrtName}</p>
          </div> :

        <div className='hidden z-20  xs:block'>
           <button className={`${RouteActive('/')&&isScroll?'text-white sm:text-gray-600':'text-gray-600'}  ${RouteActive('/Contact')&&isScroll?"text-white":''} `} onClick={()=>router.push('/Login')}>Login</button>            
          <button className='bg-primary hover:shadow-lg shadow-md px-5 py-2 text-white rounded-3xl ml-8' onClick={()=>router.push('/SignUp')}>SignUp</button>  
        </div>
          }   
    </div>
  )
}

export default Navbar 