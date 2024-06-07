"use client"
 
import { createContext,useContext,useState, useEffect } from "react"
import { getRecipe } from "../Db/Utils"
type DataType ={
    firtName:string
}
let  Globallogin =false


 

const GlobalContext = createContext({})

export const GlobalContextProvider=({children}:{children:any})=>{
    const [login,setLogIn]=useState<boolean|null>(null)
    const [logedUser,setlogedUser]=useState({})
    
   const [isLoading,setisLoading]=useState<boolean|null>(null)
    const [recipeList,setRecipeList]=useState<Array<object>>([])
    
    useEffect(()=>{
        getRecipe(setRecipeList)
        setisLoading(false)
    },[])

    return(

        <GlobalContext.Provider value={{login,setLogIn,setlogedUser,logedUser,recipeList,setRecipeList,setisLoading,isLoading}} >
            {children}
        </GlobalContext.Provider>
        )
    
}

export const useGlobalContext =()=> useContext(GlobalContext)