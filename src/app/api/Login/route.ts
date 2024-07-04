import { NextResponse } from "next/server"
import User from "../Schema/User"
import bcrypt from 'bcryptjs'
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import connectDB from "../db"
import 'dotenv/config'
import { cookies } from 'next/headers'
connectDB()
export const POST = async(request:Request)=>{
    try {
        const {Email,Password}=await request.json()

//Find User
const user:any = await User.findOne({Email})
if(user===null){

    return NextResponse.json({msg:"User not found"},{status:404})
}

//VerifyUser
 const userVerified = bcrypt.compareSync(Password,user.Password)
if(!userVerified){
    return NextResponse.json({msg:"Invalid Password"},{status:401})
} 
const token = jwt.sign({userId:user._id},process.env.privateKey!)
cookies().set('token',token, { secure: true })

    return NextResponse.json({msg:"Login Successfull",user},{status:200})
    //Give User Accesss
} catch (error) {
    console.log(error)
        return NextResponse.json({msg:"failed"},{status:400})
        
    }


}