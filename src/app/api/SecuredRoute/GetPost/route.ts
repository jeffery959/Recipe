import { NextResponse } from "next/server";
import { Authentication } from "../../AuthUser/Authentication";
import Recipe from "../../Schema/Recipe";
import connectDB from "../../db";
connectDB()
export async function GET(request:Request) {
    
       
    try {
       let User= await Authentication()
       if(User===null){

           return NextResponse.json({msg:"Failed geting route"},{status:401})
       }
       
       const recipe=await Recipe.find({OwnerId:User._id})
       return NextResponse.json({msg:"Success",recipeList:recipe,User})
    } catch (error) {
        return NextResponse.json({msg:"Failed geting route"},{status:401})
    }
   
 }