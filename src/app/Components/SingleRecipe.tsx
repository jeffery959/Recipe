"use client"
import {useState} from 'react'
import Image from "next/image"
import {formatTimeDifference} from "../../Jeffery-Library/react"
import {Tooltip} from "@nextui-org/tooltip";
import { useRouter,usePathname } from 'next/navigation'
import { DeleteModal } from "../(Navigations)/User/DeleteModal";
import { UrlLink } from '../Db/Utils';
const SingleRecipe=({optional_cls,title,img,postSince,ShrtName,Color,PostedBy,Id,DeleteToggle,setRecipes}:{optional_cls?:boolean,title:string,img?:string,postSince:Date,ShrtName:string,Color:string,PostedBy:any,Id:string,DeleteToggle?:string,setRecipes?:any})=>{
 const day = postSince?.getDate()
 const month = postSince?.getMonth()!+1
 const year = postSince?.getFullYear();
  const timediff=formatTimeDifference(postSince,' ')
  const formattedDate = `${month}/${day}/${year}`;
  const router = useRouter()
  const pathname = usePathname()
  const AllowDelete = pathname==='/User'
  const [toggleModal,setToggleModal]=useState(false)
 
  const ShowDeleteModal=()=>{
 
    if(!toggleModal) { 
      document.body.style.overflowY = "hidden"
    setToggleModal(true)
    router.push('/User#')
    return
  }
  setToggleModal(false)
    document.body.style.overflowY = "scroll"
  
  
  }
  return( 
    <div className={`${optional_cls?"w-full   flex items-center justify-center":'w-full'}`}>
      {
toggleModal&&<DeleteModal setRecipes={setRecipes} toggleModal={ ShowDeleteModal} Id={Id} Name={title}/>  
      }
    <div className="SinglePopular  flex items-center justify-between flex-col mb-10 w-full ">
   
        <div className="border cursor-pointer duration-300 w-full p-2 rounded-lg hover:shadow-lg h-80">
  
  
     
        <Image src={img?img:'/Images/Cookies.jpeg'} onClick={()=>router.push(`${UrlLink}/Recipe/${Id}`)} width={390} height={280} className="rounded-lg object-cover w-full h-full " alt=""/>
        
      </div>
      <div className="w-full mt-4 flex items-end justify-between ">
        <div className="flex items-center w-full">
    
        <div style={{background:Color}} className="w-9 h-9 rounded-full mr-2 cursor-pointer flex justify-center items-center " >
        <Tooltip content={PostedBy?.FirstName+" "+PostedBy?.LastName}>
          <p className="text-white">{ShrtName}</p>

    </Tooltip>
        </div>
        <div>
          
        <p className="text-gray-600 font-semibold">{title?title:"Colored Cookies"}</p>

        <p className="text-gray-400 text-sm">Posted on {formattedDate}</p>
        </div>
        </div>
        <div className="">

        {AllowDelete&&<button onClick={()=>ShowDeleteModal()} className="text-red-400 text-sm w-28 text-end">Delete</button>}
        <p className="text-gray-400 text-sm w-28 text-end">{timediff+"s ago"}</p>
        </div>
  
      </div>
  
      </div>
      
      </div>
    )
  }

  export default SingleRecipe