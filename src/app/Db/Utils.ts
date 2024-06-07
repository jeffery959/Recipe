import axios from "axios"
export const UrlLink:string ='http://localhost:3000'
export const getRecipe = async(setRecipeList:any)=>{
   await axios.get(`${UrlLink}/api/AllRecipe`)
    .then((response)=>{
     setRecipeList(response.data.recipeList)
    })
    .catch((err)=>{
      console.log(err)
    })

  }

