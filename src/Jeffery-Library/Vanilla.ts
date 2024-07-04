import {writeFile} from 'fs/promises'
import fs from 'fs'
import {join} from 'path'
import { v4 as uuidv4 } from 'uuid';


export const CreateFile=async(file:File,pathname:string)=>{
    try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const UniqueId=uuidv4()
   const directoryPath = join(process.cwd(), 'public',pathname)
  const filePath = join(directoryPath,UniqueId+"_"+file.name);
  fs.mkdirSync(directoryPath, { recursive: true });
  await writeFile(filePath, buffer)
  return '/'+pathname+'/'+UniqueId+"_"+file.name
} catch (err) {
  console.error('Error creating directory:', err);
}
}


export const RandomColorGenerator=()=>{
  let letters = "0123456789ABCDEF"; 
  let color ='#';
  for(let i=0;i<6;i++){
    color += letters[Math.floor(Math.random()*16)]
  }
  return color;
}