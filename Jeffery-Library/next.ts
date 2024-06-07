import { usePathname } from "next/navigation"
const routeActive=(route:string)=>{
    const routeName = usePathname()
    return routeName===route
  }


  export {routeActive}