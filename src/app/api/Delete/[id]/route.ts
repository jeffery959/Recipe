import { NextRequest, NextResponse } from "next/server"
import connectDB from "../../db"
import Recipe from "../../Schema/Recipe";
import { unlink} from "fs/promises";
connectDB()
export const DELETE = async (request:NextRequest,{params}:{params:{id:string}})=>{
    try{
        const {id}=params
        
     const user:any = await Recipe.findByIdAndDelete(id)
  unlink(process.cwd()+'/public'+user.ImageUrl)
  return NextResponse.json({msg:"Successfully Deleted"},{status:200})
  
}
catch{
        return NextResponse.json({msg:"failed",err:"sorry"},{status:400})
    }
}