"use client"
import React, { useEffect, useState } from 'react'
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SingleRecipe from '@/app/Components/SingleRecipe';
import "./User.css"
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/Context/store';
import { Modal } from './Modal';
import { setCookie,getCookie } from 'cookies-next';
import axios from 'axios';
import { Tooltip } from '@nextui-org/tooltip';
import { DeleteModal } from './DeleteModal';
const  signOut=(setLogIn:any)=>{
  setCookie('token',"")
  
    setLogIn(false)
    localStorage.setItem('Login',"false")
  }
const User = () => {
  const {login,setLogIn,logedUser}:any=  useGlobalContext()
  const router = useRouter()
  const [toggleModal,setToggleModal] =useState(false)
  const [toggleDelete,setToggleDelete] =useState(false)
  const [User,setUser]=useState({FirstName:"",LastName:""})
  const [recipes,setRecipes]=useState<any>([])
  useEffect(()=>{
    if(login===false){
      router.push('/')
     
    }
    
  },[login])

const createRecipe=()=>{
 
  if(!toggleModal) { 
    document.body.style.overflowY = "hidden"
  setToggleModal(true)
  router.push('/User#')
  return
}
setToggleModal(false)
  document.body.style.overflowY = "scroll"


}
const ShrtName=logedUser.FirstName?.split('')[0]+logedUser.LastName?.split('')[0]
const getUserPost=()=>{
  const token=getCookie('token')
  axios.get('http://localhost:3000/api/SecuredRoute/GetPost',{headers:{
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }})
  .then((resp)=>{setRecipes(resp.data.recipeList)
  console.log(resp.data)
  })
  .catch((err)=>{console.log(err)})
}
useEffect(()=>{
getUserPost()
},[])


return (
    <>
   
      <div className='w-full min-h-screen pt-36 px-2 sm:px-8   md:px-8 lg:px-24 2xl:px-64 overflow-hidden'>
      {toggleModal?<Modal toggleModal={createRecipe} getUserPost={getUserPost}/>:null }
      
      
      <div className='w-full flex flex-col items-center ju '>
      <div className='sm:w-36 sm:h-36 w-24 h-24 rounded-full flex justify-center items-center text-center text-white bg-purple-600 text-3xl sm:text-5xl ' style={{background:logedUser.Color}}>
        
      <Tooltip  content={logedUser.FirstName+" "+logedUser.LastName}>
          <p className="text-white">{ShrtName}</p>

    </Tooltip>
        
        </div>


      <div className='w-full mt-8  flex flex-col xs:flex-row justify-center gap-1 xs:gap-3'>

         <button onClick={()=>signOut(setLogIn)} className='bg-gray-200 hover:text-pink-300 hover:bg-gray-100 hover:duration-300 text-primary font-medium py-2 px-4 rounded-lg  gap-3 flex justify-center items-center'>
          <PowerSettingsNewIcon/>
          Sign out</button>
         <button onClick={createRecipe} className='bg-primary hover:text-pink-300 hover:bg-gray-100 hover:duration-300 text-white font-medium py-2 px-4 rounded-lg gap-3 flex justify-center items-center'>
        
         Create Recipe</button>
      </div>
        <div className='w-64 mt-10 flex justify-center text-center font-semibold'>
          <div className='flex gap-1 cursor-pointer border-b-2 border-gray-700'>
            <GridOnIcon className='w-5'/>
            <p>Post</p>
            </div>
          
        </div>
      </div>
      <div className='w-full gap-8 grid_Section mt-10'>
        {
          recipes.map((itm:any,key:any)=> {
             const {UserInfo,ImageUrl,timeStamp,PostedBy,Color,_id}:any=itm
             const newDate = new Date(timeStamp)
             

             const ShrtName=PostedBy.FirstName?.split('')[0]+PostedBy.LastName?.split('')[0]
            return <SingleRecipe setRecipes={setRecipes} Id={_id} PostedBy={PostedBy}  Color={Color} ShrtName={ShrtName} key={key} title={UserInfo.Title} img={ImageUrl} postSince={newDate}/>
          }        
          )
        }
      </div>
      </div>
    
    </>
  )
}


export default User