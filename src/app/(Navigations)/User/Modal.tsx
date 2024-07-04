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

export const Modal = ({toggleModal,getUserPost}:{toggleModal:any,getUserPost:any}) => {
 

  const [isDragOver,setIsDragOver]=useState(false)
  const [file,setFile]=useState(null)
  const [items,setItems]=useState({Title:'',itm1:'',itm2:'',itm3:'',itm4:'',itm5:'',itm6:'',Category:''})
  const [Categories,setCategories]=useState([{name:'Breakfast',active:false},{name:'Lunch',active:false},{name:'Supper',active:false},{name:'Drinks',active:false},{name:'Pasteries',active:false},{name:'Dessert',active:false}])
   const [isLoading,setIsLoading]=useState<boolean>(false)
  const [prewiewImage,setPreviewImage]=useState<string>("/Icons/Upload.jpg")
  const CheckedSelectedCategory = Categories.filter(itm=>itm.active===true)[0]
 
  
  const onSubmit=async(e:any)=>{
    e.preventDefault()
    if(!file){
      toast.error("Upload Image")
      return
    }
    if(!items.Title){
      toast.error("Must have a title")
      return
    }
    if(!CheckedSelectedCategory){
      toast.error("One Category required")
      return
        
    }
  
    const UserInfo:string=JSON.stringify(items)
    const data:FormData = new FormData()
 
    data.append('file', file)
    data.set("userInfo",UserInfo)
    setIsLoading(true)
    try {
      const token=getCookie('token')
     axios.post('/api/Post', data,{headers:{
      'Authorization': `Bearer ${token}`,
    }})
      .then((resp)=>{
        console.log(resp);
        setIsLoading(false)
        getUserPost()

      })
        .catch((err)=>{
          console.log(err)
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
      console.error('Error uploading file:', error);
    }
    setItems({Title:'',itm1:'',itm2:'',itm3:'',itm4:'',itm5:'',itm6:'',Category:''})
    setPreviewImage('/Icons/Upload.jpg')
    setFile(null)
  }

 const Toggle= (name:string)=>{ 
  const newCategoryList=Categories.map(itm=>{
if(itm.name==name){
  return {name,active:true}
}
  return {name:itm.name,active:false}

 })

setCategories(newCategoryList)
setItems({...items,Category:name})

}
  return (<div className='z-50 w-full  px-2 sm:px-8 md:px-8 lg:px-24 2xl:px-64 h-screen absolute userModel bg-neutral-700 top-0 left-0'>
      <Toaster/>
      
 <div className='w-full flex flex-end justify-end pt-2 '>
    <IconButton onClick={()=>toggleModal()} className="text-white">
<CloseIcon className='text-white'/>
    </IconButton>
 </div>
  
 <div className='w-full  flex justify-center mt-10'>
  <div className='Modal_Post flex flex-col px-5 py-10  bg-white rounded-lg'>
    <div
    onDragOver={(e)=>{
      e.preventDefault()
      setIsDragOver(true)
    }}
    onDragLeave={()=>
      setIsDragOver(false)
      
     
    }
    onDrop={(e)=>handleFileUpload(e,setFile,setPreviewImage,setIsDragOver)
    } 
    className='w-full flex-col  h-64 rounded-lg flex justify-center  border-2 border-dashed'>
      <Image draggable="false" src={prewiewImage} width={300} height={300} alt={''} className='object-contain cursor-pointer w-full py-4 h-5/6' />
      <div className='w-full flex justify-center'>

       <input onChange={(e)=>handleFileUpload(e,setFile,setPreviewImage,setIsDragOver)} type="file" name="" id="" className=''/>
      </div>
    </div>
    <div className='w-full'>
      <input type="text" value={items.Title} className='w-full border rounded-lg mt-4 py-3 px-4' placeholder='Title' name='Title' onChange={(e)=>handleUserValue(e,items,setItems)}/>
     <h3 className='font-medium text-gray-500 mt-3'>Category</h3>
     <div className='flex w-full justify-start gap-5 mt-4'>
           {
            Categories.map((itm,key)=>{
              return <Chips key={key} toggle={Toggle} name={itm.name} active={itm.active}/>
            })
           }
     </div>
      <div className='w-full Modal_Grid gap-2 py-4'>
      <input type="text" className='w-full border rounded-lg mt-4 py-2 px-4' placeholder='Item 1' value={items.itm1} name="itm1" onChange={(e)=>handleUserValue(e,items,setItems)}/>
      <input type="text" className='w-full border rounded-lg mt-4 py-2 px-4' placeholder='Item 2' value={items.itm2} name="itm2" onChange={(e)=>handleUserValue(e,items,setItems)}/>
      <input type="text" className='w-full border rounded-lg mt-4 py-2 px-4' placeholder='Item 3' value={items.itm3} name="itm3" onChange={(e)=>handleUserValue(e,items,setItems)}/>
      <input type="text" className='w-full border rounded-lg mt-4 py-2 px-4' placeholder='Item 4' value={items.itm4} name="itm4" onChange={(e)=>handleUserValue(e,items,setItems)}/>
      <input type="text" className='w-full border rounded-lg mt-4 py-2 px-4' placeholder='Item 5' value={items.itm5} name="itm5" onChange={(e)=>handleUserValue(e,items,setItems)}/>
      <input type="text" className='w-full border rounded-lg mt-4 py-2 px-4' placeholder='Item 6' value={items.itm6} name="itm6" onChange={(e)=>handleUserValue(e,items,setItems)}/>

      </div>
      
        {

      isLoading?<div className='flex justify-center'><Loading/></div>:
      <button onClick={(e)=>onSubmit(e)} className='w-full py-2 bg-primary rounded-lg text-white '>Submit
      </button>
      }

    </div>

  </div>

 </div>
    </div>
  )
}


const Chips=({name,active,toggle}:{name:string,active:boolean,toggle:(name:string)=>void})=>{
  
  return( <button onClick={()=>toggle(name)} className={`py-2 duration-200 px-4  hover:shadow-lg  border rounded-md ${active?'border-primary text-primary':'border-gray-500 text-gray-500'}`}>{name}</button >

)
}


