"use client"
import SingleRecipe from '../../Components/SingleRecipe'
import './home.css'
import { useEffect,useState,useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import Image from "next/image";
import { useGlobalContext } from '@/app/Context/store';
import { handleUserValue } from '../../../Jeffery-Library/react';
import { Toaster,toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);
export default function Home() {
  const swiperRef:any = useRef(null);
  const {login,setLogIn,recipeList}:any=useGlobalContext()
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [contactInfo,setcontactInfo] = useState({Email:"",Message:""})
 
  const router = useRouter()
  useEffect(() => {


    setWindowWidth(window.innerWidth);

  }, []);
  
  useEffect(()=>{

    const handleResize=()=>{
            setWindowWidth(window.innerWidth);
            
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  const ContactUs =()=>{
    if(contactInfo.Email===''||contactInfo.Message==='') 
   { toast.error("Fill all fields") 
   return
  }
    setcontactInfo({Email:"",Message:""})
    toast.success("Message sent")
  }

  const nextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // Function to move to the previous slide
  const prevSlide = () => {
   
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <main className="w-full  flex justify-center flex-col sm:pt-20">
      <Toaster/>
      <div className="Row_Grid_1  gap-4 px-2  sm:px-8  sm:py-16 md:py-28  md:px-8 lg:px-24    ">
        <div className="flex z-20 flex-col mt-16 sm:mt-0 py-4 pb-6 lg:justify-between justify-evenly">
          <div className="">

        <h4 className="font-bold text-4xl md:text-5xl lg:text-6xl sm:text-gray-700 text-white sm:text-left text-center"><span className="text-primary">Discover</span>, Create, and Share Delicious Recipes</h4>
        <p className="sm:text-gray-400 font-medium text-white lg:text-xl mt-4 sm:text-left text-center">Welcome to Delicacy, where culinary creativity knows no bounds. Dive into our vast collection of mouthwatering recipes curated by fellow food enthusiasts</p>
          </div>
          <div className="w-full flex justify-between">
            <button onClick={()=>router.push('/Recipe')} className="w-2/6 sm:w-2/5 sm:py-4 py-3 shadow-md duration-200 hover:shadow-lg max-w-64 rounded-full  text-white bg-primary">View Now</button>
            <button onClick={()=>{if(login){ router.push('/User');return;};
              toast.error('Sign In')}} className="w-2/6 sm:w-2/5 shadow-md duration-200 hover:shadow-lg max-w-64 rounded-full py-3 border-primary text-primary border">Create recipe</button>
          </div>
        </div>
        <div className="w-full Img_Contain ">

        <Image src={'/Images/Pancakes.jpg'} width={400} height={400}  className="w-full object-cover h-full sm:rounded-2xl " alt="" />


        </div>

      </div>

    
      <div className="Row_Grid_2 lg:mt-60 md:mt-24 sm:mt-20  w-full ">
        <p className="w-full mt-20 mb-10 text-Gray-Bold text-center  text-2xl md:text-3xl  font-semibold">Popular</p>
        <div className="w-full sm:flex sm:items-center">
          <div className={`${windowWidth>=640?'':'hidden'}bg-primary py-1 px-1 rotate-180 cursor-pointer text-white rounded-full hover:shadow-lg duration-300  flex items-center mr-2`} onClick={prevSlide}>
            <Image src={'/Icons/Next.svg'} width={40} height={40} alt="" className="w-12 "/>
          </div>
      <Swiper
      ref={swiperRef}
        slidesPerView={windowWidth>1024?3:windowWidth>=640?2:1}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }} 
        modules={[Pagination]}
         
        className="mySwiper px-2 gap-4"
      >
          {
              recipeList?.map((itm:any,key:any)=>  {
                const {UserInfo,ImageUrl,timeStamp,PostedBy,Color,_id}:any=itm
                const newDate = new Date(timeStamp)
   
                const ShrtName=PostedBy.FirstName.split('')[0]+PostedBy.LastName.split('')[0]
               return    <SwiperSlide key={key}><SingleRecipe Id={_id} PostedBy={PostedBy} Color={Color} optional_cls={true} ShrtName={ShrtName}  key={key} title={UserInfo?.Title} img={ImageUrl} postSince={newDate}/>   </SwiperSlide>
             }    )
            }
        
        
      
      </Swiper>
      <div className={`${windowWidth>=640?'':'hidden'}bg-primary cursor-pointer py-1 px-1  text-white  flex items-center rounded-full ml-2 hover:shadow-lg duration-300`} onClick={nextSlide}> <Image src={'/Icons/Next.svg'} width={40} height={40} alt="" className="w-12 "/>
      </div>
      
      </div>
      </div>
      <div className="   ">
        <p className="w-full  text-center text-2xl md:text-3xl 
         font-semibold mt-20 mb-10 text-Gray-Bold">Category</p>
        <div className="Row_Grid_3 sm:px-8   md:px-8 lg:px-24   gap-4 py-10 lg:py-14 px-4 2xl:px-64  bg-primary">
          <SingleIcon imgSrc='/Images/Breakfast.png' title='Breakfast'/>
          <SingleIcon imgSrc='/Images/Lunch.png' title='Lunch'/>
          <SingleIcon imgSrc='/Images/Supper.png' title='Supper'/>
          <SingleIcon imgSrc='/Images/Drinks.png' title='Drinks'/>
          <SingleIcon imgSrc='/Images/Cake.png' title='Pasteries'/>
          <SingleIcon imgSrc='/Images/Dessert.png' title='Dessert'/>
      

        </div>
      </div>
      <div className="">
      <p className="w-full  text-center text-2xl md:text-3xl 
         font-semibold mt-20 mb-10 text-Gray-Bold">Kitchen Tips and Tricks</p>
         <div className="w-full Row_Grid_4 gap-4 items-center ">
          <Image src="/Images/kitchen-hacks.webp" width={500} height={500} alt="" className="w-full KTT_Img rounded-xl object-contain"/>
          <div className="text-white bg-primary px-4 flex flex-col justify-between py-4 lg:py-12 rounded-xl h-full">

              <li>Lorem ipsum dolor sit </li>
              <li>eiusmod tempor ut labore et dolore magna aliqua</li>
              <li>Duis aute irure dolor in reprehenderit </li>
              <li>eiusmod tempor ut labore et dolore magna aliqua</li>
              <li>Duis aute irure dolor in reprehenderit </li>
              <li>Lorem ipsum dolor sit </li>
         
          </div>

         </div>
      </div>
      <div className="w-full justify-center items-center"> <p className="w-full  text-center text-2xl md:text-3xl 
         font-semibold mt-20 mb-10 text-Gray-Bold">ContactUs</p>

      <div className="bg-primary w-full  py-2 ">
        
     
         <div className="  w-full Row_Grid_5 gap-4 items-center ">
          <Image src="/Undraw/Contact.svg" width={500} height={500} alt="" className="lg:w-10/12 w-full my-4 KTT_Img rounded-xl object-contain"/>
          <div className="text-white
            flex flex-col justify-evenly py-4 rounded-xl h-full">
            <p className="w-full text-center text-2xl font-bold text-white">ContactUs</p>
            <div className="w-full text-gray-700">

            <input type="text" onChange={(e)=>handleUserValue(e,contactInfo,setcontactInfo)} name='Email' value={contactInfo.Email} placeholder="Email" className="w-full  duration-300 focus:shadow-2xl  outline  rounded-xl outline-primary py-2 mb-2 px-4" />
            <textarea id="" name='Message' onChange={(e)=>handleUserValue(e,contactInfo,setcontactInfo)} value={contactInfo.Message}  rows={10} placeholder="Write a message.."    className="rounded-xl duration-300 focus:shadow-2xl outline-none outline-primary  py-2 md:py-4  w-full px-4"></textarea>
            <button onClick={ContactUs} className='text-primary py-1 w-full border rounded-lg bg-white'>Submit</button>
            </div>

         <div>

            <p className="w-full text-center">Email:aaronjeffery529@gmail.com</p>
            <p className="w-full text-center">Phone:+123-456-7890</p>
         </div>
          </div>


         </div>
      </div>
      

      </div>
    <div className="w-full pb-20 md:px-8 lg:px-24 px-2  sm:px-8  ">
      <p className="w-full  text-center text-2xl md:text-3xl 
         font-semibold mt-20 mb-3 text-Gray-Bold">NewsLetter</p>
         <p className="w-full text-center text-Gray-SubBold text-lg">Subcribe to get update on our daily news letter</p>
<div className="w-full mt-2 items-center flex justify-center">
  <input type="text" placeholder="Email" className="px-4 py-2 w-7/12 focus:outline-primary border mr-4 rounded-lg max-w-72" />
  <button className="px-4 py-2 bg-primary w-5/12 max-w-32 hover:shadow-lg duration-200 text-white rounded-lg">Subscribe</button>

</div>
      </div> 

    </main>
  );
}

const SingleIcon=({imgSrc,title}:{imgSrc:string,title:string})=>{
  const router = useRouter()
 const Redirect=()=>{
  router.push(`http://localhost:3000/Recipe?category=${title}&search=`)
 }
  return(
    <div onClick={()=>Redirect()} className="cursor-pointer hover:shadow-lg hover:bg-slate-100 duration-150 w-full bg-white  border flex-col py-4  flex justify-center items-center rounded-2xl">
      <Image src={imgSrc} width={200} height={300} className="w-20 lg:w-36 sm:w-24 mb-2 cursor-pointer  object-contain" alt=""/>
      <p className="w-full text-center text-gray-400 font-semibold ">{title}</p>
    </div>
  )
}
