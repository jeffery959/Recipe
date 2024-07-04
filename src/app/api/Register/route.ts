import mongoose from "mongoose"
import User from "../Schema/User"
import UserOtpVerification from "../Schema/UserOtp";
import { NextRequest,NextResponse } from "next/server"
import { Peddana } from "next/font/google";
import bycrpt from 'bcryptjs'
import connectDB from "../db";
import { RandomColorGenerator } from "../../../Jeffery-Library/Vanilla";
connectDB()
export async function POST(request:Request) {
   try {
      //Get Email from request
      const {Email,otp}= await request.json()
      //Check if userEmailExist
      const UserEmailExist = await User.findOne({Email});
   
      if(UserEmailExist){
        return NextResponse.json({msg:"Otp alredy used"},{status:409})
      }
      //Find and store The user otp with an email
      const pendingUser:any =await UserOtpVerification.findOne({Email})
      if(pendingUser===null){
     return NextResponse.json({msg:"Navigate to Signup page"},{status:400})

  }
       //Verify pendingUser and Create New user
     const userVerified = bycrpt.compareSync(otp,pendingUser.otp)
       
  if(!userVerified){
     
   return NextResponse.json({msg:"Wrong Otp"},{status:401}) 
}
const Color = RandomColorGenerator()
  const user = new User({FirstName:pendingUser.FirstName,LastName:pendingUser.LastName,Email:pendingUser.Email,Password:pendingUser.Password,userImg:'',Color})
     await user.save()
     await pendingUser.deleteOne()
       return NextResponse.json({msg:"Success"},{status:201}) 
       
      } catch (error) {
      return NextResponse.json({msg:"Failed",error},{status:400}) 
      
   }
  
}