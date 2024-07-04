import { writeFile } from 'fs/promises';
//Toggle react boolean [toggle,setToggle] type is a boolean useState function
const toggleEvent =(toggle:boolean,setToggler:React.Dispatch<React.SetStateAction<boolean>>)=>{
    setToggler(!toggle)
  }

//Set users key to a value by connecting to input type is an object useState function
//Update and Remove later :Purpose was for seting a user  but can be used in other for other purpose
const handleUserValue=(e:any,user:object,setUser:any,setRepeat?:any)=>{
    const {name,value}=e.target
    if(name==="RepeatPassword"){
      setRepeat(value)
     }
       setUser({...user,[name]:value})

 }

 //Handle file upload for useState is should have three useState
 const handleFileUpload =(e:any,setFile:any,setPreviewImage:any,setIsDragOver?:any)=>{
  e.preventDefault()
  let file;
  if(e.target.files){
    file = e.target.files[0]
    
  }
  else{
   file = e.dataTransfer.files[0]

 }

 
 if(file){
   const reader = new FileReader();
   reader.onload =(event:any)=>{
     setPreviewImage(event.target.result);
     setIsDragOver(false);
    }
    reader.readAsDataURL(file)
    console.log(file)
    setFile(file)
} 
  }
  export function formatTimeDifference(date:any,space:" "|"") {
    const currentDate:any = new Date();
    const timeDifference = currentDate - date; // Time difference in milliseconds
  
    // Define time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 31 * day;
    const year= 365 * day;
  
    if (timeDifference < minute) {
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds}${space}sec`;
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return `${minutes}${space}min`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return `${hours}${space}hr`;
    } 
     else if (timeDifference < week) {
      const days = Math.floor(timeDifference / day);
      return `${days}${space}day`;
    } 
     else if (timeDifference < month) {
      const weeks = Math.floor(timeDifference / week);
      return `${weeks}${space}wk`;
    } 
     else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      return `${months}${space}mth`;
    } 
    else {
      const years = Math.floor(timeDifference / year);
      return `${years}${space}yr`;
      
    }
  }


  export {toggleEvent,handleUserValue,handleFileUpload}