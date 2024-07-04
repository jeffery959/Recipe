import { NextResponse } from "next/server"
import User from "../Schema/User"
import UserOtpVerification from "../Schema/UserOtp"
import bcrypt from 'bcryptjs'
import { sendVerificationCode } from "../../../Jeffery-Library/next_backend"
import mongoose from "mongoose"
import connectDB from "../db"

connectDB()
export const POST = async (request:Request)=>{
    try {
    const {Email,FirstName,LastName,Password}=await request.json()
    const otp:string= `${Math.floor(1000 + Math.random() * 9000)}`;
    const UserEmailExist = await User.findOne({Email});
  if(UserEmailExist){
    return NextResponse.json({msg:"Email already exist"},{status:409})
  }
 
        
         const UserOtpExist = await UserOtpVerification.findOne({ Email });
     const salt = bcrypt.genSaltSync(10);
     const hash = bcrypt.hashSync(otp, salt);
     const hashPass = bcrypt.hashSync(Password, salt);
     let user;
     if (UserOtpExist) {
        user = await UserOtpExist.updateOne({
            FirstName,
          LastName,
          Email,
          Password: hashPass,
          otp: hash
        });
      } else {
        user = await UserOtpVerification.create({
            FirstName,
            LastName,
            Email,
            Password: hashPass,
            otp: hash,
          });
      } 

 //Success
 sendVerificationCode(otp,Email) 

    return NextResponse.json({msg:"otp sent"})
} catch (error) {
   
    return NextResponse.json({msg:"Otp failed"},{status:401})
}
    
}

