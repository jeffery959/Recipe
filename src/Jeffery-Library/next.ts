import { usePathname } from "next/navigation"
const RouteActive=(route:string)=>{
    const routeName = usePathname()
    return routeName===route
  }


  export {RouteActive}