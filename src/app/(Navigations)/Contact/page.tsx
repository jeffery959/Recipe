"use client"
import {useState} from 'react'
import Image from 'next/image'
import './contact.css'
import { Toaster,toast } from 'react-hot-toast'
import { handleUserValue } from '../../../Jeffery-Library/react'

const Contact = () => {
  
  const [contactInfo,setcontactInfo] = useState({FirstName:"",LastName:"",Message:""})
  const ContactUs =()=>{
    if(contactInfo.FirstName===''||contactInfo.LastName===''||contactInfo.Message==='') 
   { toast.error("Fill all fields") 
   return
  }
    setcontactInfo({LastName:'',FirstName:"",Message:""})
    toast.success("Message sent")
  }
  return (
    <div className=''>   
    <Toaster/>
    <div className='w-full contact-Screen '>
  <Image src={"/Images/ContactUs_bg.jpg"} width={800} height={800} alt='' className='min-h-96 w-full Img_Container h-1/2 object-cover 0 -z-10'/>
  <div className='pt-24 absolute top-0  sm:pt-44 lg:pt-60 w-full px-2 sm:px-8  min-h-96 md:px-8 lg:px-24 2xl:px-64 Img_Container '>
  <h3 className='z-40  font-bold text-white w-full text-center text-2xl md:text-3xl'>ContactUs</h3>
  <p className='w-full text-white font-semibold text-center mt-4 '>Got questions? Don&#39;t worry, we&#39;ve got answers! Whether you need recipe suggestions, cooking tips, or just want to chat about all things food, our team is here for you. Drop us a line anytime, and we&#39;ll do our best to assist you on your culinary journey. Let&#39;s cook up something delicious together</p>

  </div>
  <div className='px-2 sm:px-8   md:px-8 lg:px-24 2xl:px-64 w-full flex items-center justify-center flex-col '>
    <p className='w-full text-center text-2xl text-Gray-Bold font-bold py-10'>Lets Start a Conversation</p>
    <input value={contactInfo.FirstName} onChange={(e)=>handleUserValue(e,contactInfo,setcontactInfo)} name='FirstName' type="text" className='w-full px-4 py-2 lg:w-1/3   rounded-lg border border-gray-200' placeholder='FirstName' />
    <input value={contactInfo.LastName} onChange={(e)=>handleUserValue(e,contactInfo,setcontactInfo)} name='LastName'  type="text" className='w-full my-4 px-4 lg:w-1/3  py-2  rounded-lg border border-gray-200' placeholder='LastName' />
    <textarea value={contactInfo.Message}  onChange={(e)=>handleUserValue(e,contactInfo,setcontactInfo)} name='Message'  cols={10} rows={10}  className='w-full px-4 py-2 lg:w-1/3 rounded-lg border border-gray-200' placeholder='Write a message' />
 <button onClick={ContactUs} className='rounded-md w-full lg:w-1/3 my-4 px-4 py-2 bg-primary text-white'>Submit</button>
  </div>
  <div className='px-2 sm:px-8 gap-8 mt-40 pb-20     md:px-8 lg:px-24 2xl:px-64 w-full Contact_Grid  '>
     <ContactSlide src='/Icons/Phone.svg' text='Call Us' subtxt='+123-456-789'/>
     <ContactSlide src='/Icons/Email.svg' text='EmailUs' subtxt='someone@gmail.com'/>
     <ContactSlide src='/Icons/Location.svg' text='Location' subtxt='123 Dawin Avenue'/>
  </div>
    </div>
    </div>
  )
}
const ContactSlide=({src,text,subtxt}:{src:string,text:string,subtxt:string})=>{
  return(
    <div className='w-full px-8 xl:h-64 h-52 bg-gray-200 rounded-xl flex  flex-col items-center'>
      <div className='w-12 h-12 relative -top-3 bg-primary rounded-full flex justify-center items-center'>

      <Image src={src} width={30} height={30} className='w-8 h-8 p-1' alt=''/>
      </div>

      <div className='w-full h-1/2 justify-between flex flex-col'>
        <p className='font-bold text-xl text-Gray-Bold'>{text}</p>
        <p className='w-full text-center text-primary  font-medium'>{subtxt}</p>


      </div>
    </div>
  )
}
export default Contact