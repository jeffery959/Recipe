import jwt from "jsonwebtoken"
import { headers } from 'next/headers'
import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import 'dotenv/config'
import User from "../Schema/User"
import Error from "next/error"
import connectDB from "../db"
interface CustomRequest extends Request {
     User?:any
}
connectDB()
interface ErrorProps {
     message: string;
 }
 
 const customError: ErrorProps = {
     message: "This is a custom error message",

 };
export const Authentication:() => Promise<any> = async()=>{
     
     try {
          
          
          const authHeader=headers().get('authorization')
          const token=authHeader&& authHeader.replace('Bearer ','').split(' ')[0]
          if(token===null) return NextResponse.json({msg:"Failed"},{status:401})
          
       const decoded:any =jwt.verify(token,process.env.privateKey!)
       
     const user =await User.findOne({_id:decoded.userId})
   if(user){

        return user
   }
   else{
     cookies().set('token',"")
     return null
   }
    
    
          
     } catch (error:any) {
          return null
          
     }
}