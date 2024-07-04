"use client"
import React, { useEffect, useState } from 'react'
import "./SingleItem.css"
import Image from 'next/image'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useParams } from 'next/navigation'
import { useGlobalContext } from '@/app/Context/store';
import Loading from '@/app/Components/Loading';
import { formatTimeDifference } from '../../../../Jeffery-Library/react';
import { timeStamp } from 'console';
const Page = () => {
   const {id}= useParams()
   const {recipeList,isLoading,setisLoading}:any= useGlobalContext()
   const [SingleItem,setSingleItm]=useState(recipeList.filter((itm:any)=>itm._id===id)[0])
   const [timediff,setTimeDiff]=useState("")
   const [postSince,setpostSince]=useState<Date>()
   const fullName = SingleItem?.PostedBy.FirstName+" "+SingleItem?.PostedBy.LastName
   
   
   useEffect(()=>{
    if(recipeList.filter((itm:any)=>itm._id===id)){

    }
    setSingleItm(recipeList.filter((itm:any)=>itm._id===id)[0])
      
   
    
         setTimeDiff(formatTimeDifference(new Date(SingleItem?.timeStamp),' '))
   },[recipeList])

   
   const ShrtName=SingleItem?.PostedBy.FirstName.split('')[0]+SingleItem?.PostedBy.LastName.split('')[0]
  return (
    <div className='pt-32  w-full min-h-screen flex justify-center items-center'>
    
{isLoading?<Loading/>:
    <div className='w-full  '>
 <h2 className='w-full text-Gray-Bold font-bold text-2xl text-center mb-10'>Colored Cookies</h2>
<div className='w-full px-2 sm:px-8 md:px-8 lg:px-24 2xl:px-60 SingleItem_Grid_1   gap-4 lg:gap-10'>
    <div className='w-full flex  SingleItem_Grid_1-ImgFrame'>

    <Image src={SingleItem?SingleItem?.ImageUrl:""} width={600} height={600} alt='' className='w-full rounded-3xl object-cover h-full'/>
    </div>
    <div className='flex'>
        
        <p style={{background:SingleItem?.Color}} className=' flex justify-center items-center rounded-full text-white  w-12 h-12'>{ShrtName}</p>

    
    <div className='xl:w-5/6 2xl:w-4/6 w-full px-2'>
        <h5 className='text-lg text-Gray-Bold font-bold'></h5>
        <div className='flex justify-between'>
        <p className="text-gray-400 text-sm">{fullName}</p>
        <p className="text-gray-400 text-sm">{formatTimeDifference(new Date(SingleItem?.timeStamp),' ')}</p>

        </div>
       
        <h5 className='text-lg text-Gray-Bold font-bold mt-5'>Description</h5>
        <p className='text-Gray-SubBold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>

    </div>
    

    </div>

</div>
<div className='w-full  mt-10 py-10  px-2 sm:px-8 md:px-8 lg:px-24 2xl:px-60 '>
<h2 className='w-full  font-bold text-2xl text-Gray-Bold text-center mb-10 '>Steps</h2>
<div className='Ingredient_Grid flex flex-col justify-between items-center px-4 py-2 min-h-60 bg-primary  text-lg  text-white rounded-lg'>
    <div>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed </li>
        <li>do eiusmod tempor incididunt ut labore et dolore magna </li>
        <li>aliqua. Ut enim ad minim veniam, quis nostrud exercitation  </li>
        <li>ullamco laboris nisi ut aliquip ex ea commodo consequat.   </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit esse    </li>
        <li>cillum dolore eu fugiat nulla pariatur. Excepteur sint  </li>
    </div>
    <div>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed </li>
        <li>do eiusmod tempor incididunt ut labore et dolore magna </li>
        <li>aliqua. Ut enim ad minim veniam, quis nostrud exercitation  </li>
        <li>ullamco laboris nisi ut aliquip ex ea commodo consequat.   </li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit esse    </li>
        <li>cillum dolore eu fugiat nulla pariatur. Excepteur sint  </li>
    </div>
</div>
</div>
    </div>
}
</div>
  )
}

/*  <div className='flex mt-2 justify-between items-center '>
        <button className='bg-primary hover:shadow-lg shadow-md px-5 py-2 text-white rounded-3xl flex items-center justify-center ' onClick={()=>console.log(SingleItem)}>Notify
        <Image src={'/Icons/Notify.svg'} width={20} height={20} alt='' className='ml-2'/>
        </button>  
        <Image src={'/Icons/Saved.svg'} width={16} height={16} alt='' className='ml-2 cursor-pointer'/>

        </div> */
export default Page