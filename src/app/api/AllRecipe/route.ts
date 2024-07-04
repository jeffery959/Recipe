import { NextRequest, NextResponse } from "next/server"
import Recipe from "../Schema/Recipe";
import connectDB from "../db";
import User from "../Schema/User";
export async function GET() {
  connectDB()
  try {
   const recipeList = await Recipe.find()
 return NextResponse.json({msg:'Hello',recipeList},{status:201})   
} catch (error) {
    return NextResponse.json({msg:'failed'},{status:401})   
    
}
   
 }