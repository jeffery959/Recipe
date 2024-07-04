'use client'
import React from 'react'
import Image from 'next/image'
import './about.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import {useState} from 'react'
import { toggleEvent } from '../../../Jeffery-Library/react';
import Link from 'next/link';
const AboutUs = () => {
  return (
    <div className='z-10 pt-32 mb-10 '>
      <div className='w-full px-2 sm:px-8 md:px-8 lg:px-24 2xl:px-64'>
        <h4 className='w-full  text-center text-2xl md:text-3xl 
         font-semibold mb-10 text-Gray-Bold'>AboutUs</h4>
        <p className='text-center w-full font-semibold text-Gray-SubBold py-5'>Welcome to our recipe haven! Here at Reciepe, we&#39;re passionate about all things culinary. Our mission is simple: to inspire and empower you to create delicious dishes in your own kitchen.Let&#39;s savor every bite and make every meal a memorable experience! </p>
        <div className='w-full flex justify-center mt-5'>

        <Image src={'/Images/FemaleBaker.jpg'} width={500} height={400} alt="" className='Img_About object-cover rounded-lg'/>
        </div>

      </div>
      <div className='w-full mt-20'>
        <h4 className='w-full  text-center text-2xl md:text-3xl 
         font-semibold mb-10 text-Gray-Bold'><span className='font-normal'>Our</span>Team</h4>
        <div className='w-full gap-8 py-20 2xl:px-64 px-2 sm:px-8 md:px-8 lg:px-24  flex justify-center mt-5 bg-primary  about_Grid'>
          <TeamMember/>
          <TeamMember/>
          <TeamMember/>
          <TeamMember/>
        
        </div>

      </div>
      <div className='w-full mt-20'>
        <h4 className='w-full  text-center text-2xl md:text-3xl 
         font-semibold mb-10 text-Gray-Bold'>Frequently Asked Questions</h4>
  
        <div className='w-full  py-5 px-2 sm:px-8 md:px-8 lg:px-24 2xl:px-64  flex justify-center mt-5 flex-col   '>
          <FAQ text={'How do I contact Chefs for costom dishes?'}/>
          <FAQ text={'How do I Upload my own recipe?'}/>
          
          <FAQ text={'What is the purpose of the website?'}/>
        
        
        </div>

      </div>
      <div className='w-full px-2 sm:px-8 md:px-8 2xl:px-64 lg:px-24 mt-20 flex justify-center items-center flex-col'>
        <h4 className='w-full  text-center text-2xl md:text-3xl 
         font-semibold mb-10 text-Gray-Bold'>Still got questions?</h4>
  
        <p className='py-5 text-center w-full font-semibold text-Gray-SubBold'>Got questions? Don&#39;t worry, we&#39;ve got answers! Whether you need recipe suggestions, cooking tips, or just want to chat about all things food, our team is here for you. Drop us a line anytime, and we&#39;ll do our best to assist you on your culinary journey. Let&#39;s cook up something delicious together!</p>
        <Link href={'http://localhost:3000/Contact'} className='border-primary text-primary py-2 px-4 border w-40 rounded-sm mt-2 hover:shadow-lg flex justify-center duration-200'>Contact Us</Link>

      </div>

    </div>
  )
}

const TeamMember=()=>{
  return(<div className='w-full justify-center flex flex-col items-center'>
    <Image src={'/Undraw/Male_Avatar.svg'} width={100} height={100} alt=''/>
    <h5 className='text-white font-bold w-full text-center '>Jane Doe</h5>
    <h5 className='text-white font-medium w-full text-center'>UiDesigner</h5>
    <p className='w-full sm:w-4/6 text-center text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>

  </div>
  )
}

const FAQ=({text}:{text:string})=>{
  const [toggle,setToggle]=useState(false)
  return(
    <div className={`w-full flex flex-col border-b py-8 ${toggle?'h-auto':'h-12'} overflow-hidden bg-white `}>
        <div className='dropdown w-full flex justify-between '>

          <p className='text-Gray-SubBold font-bold '>{text}</p>
          <IconButton onClick={()=>toggleEvent(toggle,setToggle)}>
          <Image src={'/Icons/dropdown.svg'} width={2} height={20} className={`${toggle?'rotate-180':''} duration-500 h-3 w-3`} alt=''/>
          </IconButton>
        </div>
          <p className='mt-6 text-Gray-SubBold font-medium'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat est fugiat necessitatibus quod commodi quaerat et itaque vero aliquid dolore.</p>
          </div>
  )
}
export default AboutUs