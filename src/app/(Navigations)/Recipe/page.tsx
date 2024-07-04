"use client"
import React, { Suspense, useEffect, useState } from 'react'
import "./recipe.css"
import SingleRecipe from '@/app/Components/SingleRecipe'
import { useGlobalContext } from '@/app/Context/store'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { getRecipe } from "../../Db/Utils"

const Recipe = () => {
 

  const {recipeList,setRecipeList}:any=useGlobalContext()
  const [recipes,setRecipes]=useState(recipeList)

 const [RecipeTitle,setRecipeTitle]=useState("Recipe")


  useEffect(()=>{
getRecipe(setRecipeList)
  },[])
  


  return (
    <div className='w-full 2xl:px-64 px-2 sm:px-8 md:px-8 lg:px-24 pt-32 '>
      <h2 className='text-Gray-Bold font-bold text-2xl w-full text-center mb-10'>{RecipeTitle}</h2>
      <div className='w-full Recipe_Grid_1'>
        <Suspense>
        <NewSearch recipeList={recipeList} setRecipeTitle={setRecipeTitle} setRecipes={setRecipes}/>
        </Suspense>
        <div className='w-full   Recipe_Grid_1_subgrid gap-2'>
          {
            recipes?.map((itm:any,key:any)=>  {
              const {UserInfo,ImageUrl,timeStamp,PostedBy,Color,_id}:any=itm
              const newDate = new Date(timeStamp)
 
              const ShrtName=PostedBy.FirstName.split('')[0]+PostedBy.LastName.split('')[0]
             return <SingleRecipe Id={_id} PostedBy={PostedBy} Color={Color} optional_cls={false} ShrtName={ShrtName}  key={key} title={UserInfo?.Title} img={ImageUrl} postSince={newDate}/>
           }    )
          }
 
        </div>

      </div>
    </div>
  )
}

const NewSearch = ({recipeList,setRecipes,setRecipeTitle}:{recipeList:any,setRecipes:any,setRecipeTitle:any})=>{
  const router = useRouter()
  
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [Categories,setCategories]=useState([{name:'All',active:false},{name:'Breakfast',active:false},{name:'Lunch',active:false},{name:'Supper',active:false},{name:'Drinks',active:false},{name:'Pasteries',active:false},{name:'Dessert',active:false}])
  const category :string|null = searchParams.get('category')
  const Search:any = searchParams.get('search')
  const [srcValue,setSrcValue]=useState(Search)
  const FilterCategory=async(name:string)=>{
 
    
    if(name==='All'||name===''||name==null){
      router.push(`http://localhost:3000/Recipe?category=All&search=${Search=='null'?Search:''}`)
      setRecipes(recipeList)
      setRecipeTitle("Recipe")
      return recipeList
    }
    router.push(`http://localhost:3000/Recipe?category=${name}&search=${Search}`)
    const newRecipe=recipeList.filter((itm:any)=>itm.UserInfo.Category===name)
    setRecipeTitle(name)
    setRecipes(newRecipe)
    
    
  }
  const FilterSearch=(e:any)=>{
    
    router.push(`http://localhost:3000/Recipe?category=${category}&search=${e}`)
    
    let CategoryRecipe=recipeList.filter((itm:any)=>itm.UserInfo.Category===category)
    if(category==='All'){
CategoryRecipe = recipeList
    }

    const newRecipe=CategoryRecipe.filter((itm:any)=>itm.UserInfo.Title.toLowerCase().startsWith(e.toLowerCase()))
    setSrcValue(e)
    setRecipes(newRecipe)


  }
  useEffect(()=>{
    if(Search===''||Search==null){
      FilterCategory(category!)
      return
    }else{
      FilterSearch(Search)
      console.log(Search)

    }
   
  },[recipeList])
  return (
    <div className='Recipe_Grid_1_Category w-full'>
          <p className='hidden md:block text-Gray-Bold w-full font-bold '>Category</p>
          <input value={srcValue} onChange={(e)=>FilterSearch(e.target.value)} type="text" placeholder='Search' className='w-full py-2 px-4 border border-gray-400 outline-none foucs:border-2 focus:border-primary rounded-lg my-4' />
          <div className='flex w-full flex-wrap gap-2 justify-center md:justify-start mb-10'>
             {
            Categories.map((itm,id)=>{
              return <Chips key={id} FilterCategory={FilterCategory} text={itm.name} />
            })
           }
          </div>

        </div>
  )
}
const Chips=({text,FilterCategory}:{text:string,FilterCategory:(name:string)=>void})=>{
  
  return( <button onClick={()=>FilterCategory(text)} className='py-2 duration-200 px-4  hover:shadow-lg border-primary text-primary border rounded-md'>{text}</button >

)
}

export default Recipe