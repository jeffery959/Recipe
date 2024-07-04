"use client"
import React,{useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import { handleFileUpload, handleUserValue } from '../../../Jeffery-Library/react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Loading from '@/app/Components/Loading';

export const DeleteModal = ({toggleModal,Id,Name,setRecipes}:{toggleModal:()=>void,Id:string,Name:string,setRecipes:any}) => {
 
  const getUserPost=async()=>{
    const token=getCookie('token')
    await axios.get('http://localhost:3000/api/SecuredRoute/GetPost',{headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }})
    .then((resp)=>{setRecipes(resp.data.recipeList)
    console.log(resp.data)
    })
    .catch((err)=>{console.log(err)})
  }
const DeleteItem=async(Id:string)=>{
  await axios.delete(`http://localhost:3000/api/Delete/${Id}`)
  .then(async (resp)=>{
    
   await getUserPost()
    toast.success("Item has been deleted")
  console.log(resp)
})
.catch((err)=>{
  toast.error("Failed to delete Item")
  console.log(err)

})
}


  return (<div className='z-50 w-full  px-2 sm:px-8 md:px-8 lg:px-24 2xl:px-64 h-screen absolute userModel bg-neutral-700 top-0 left-0'>
      <Toaster/>
      
 <div className='w-full flex flex-end justify-end pt-2 '>
    <IconButton onClick={()=>toggleModal()} className="text-white">
<CloseIcon className='text-white'/>
    </IconButton>
 </div>
 <div className='w-full h-2/3 flex justify-center items-center mt-10'>
  <div className='w-1/2 flex flex-col justify-center items-center px-5 py-10  bg-white rounded-lg'>
    <p>Are you sure you want to delete Burger?</p>   
    <button onClick={()=>DeleteItem(Id)} className='text-red-500 my-4 font-semibold'>Confirm</button>
    <button onClick={()=>toggleModal()} className='text-red-500 '>Cancel</button>

  </div>

 </div>

      
      


    </div>
  )
}
