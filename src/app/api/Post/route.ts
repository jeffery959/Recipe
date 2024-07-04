import { NextRequest, NextResponse } from "next/server"
import { CreateFile,RandomColorGenerator } from "../../../Jeffery-Library/Vanilla";
import Recipe from "../Schema/Recipe";
import connectDB from "../db";
import { cookies } from "next/headers";
import { Authentication } from "../AuthUser/Authentication";
connectDB()
export async function POST(request:NextRequest) {
try {
    const body = await request.formData()
     const file:any = body.get('file')
     if(!file){
         
         return NextResponse.json({ msg: 'File does not exist' }, { status: 404});
        }
        let UserInfo:any=body.get('userInfo')
        UserInfo= JSON.parse(UserInfo)
      const User = await Authentication()
    console.log(UserInfo)
  const UniqueId= await CreateFile(file,"PostImg")
  const Color = User.Color
  
  console.log(UniqueId)
  console.log(User)
 
await Recipe.create({
    UserInfo,
    ImageUrl:UniqueId,
    timeStamp:new Date(),
    OwnerId:User._id,
    Color,
    PostedBy:{FirstName:User.FirstName,LastName:User.LastName},
   
    



})
 return NextResponse.json({msg:'Hello',UserInfo},{status:201})   
} catch (error) {
    return NextResponse.json({msg:'failed'},{status:401})   
    
}
   
 }