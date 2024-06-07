import React from 'react'

const Footer = () => {
  return (
    
    <footer className="sm:px-8 md:mt-40 mt-28  2xl:px-64 px-2 md:px-8  lg:px-24  font-sans relative  w-full text-sm text-gray-400">
  <div className='border-t sm:pt-28 pt-16  pb-10  gap-1  w-full justify-between sm:flex block  '>
<p className='text-base text-Gray-Bold font-bold w-full text-center sm:w-auto '>Recipe </p>
<p className='text-center sm:my-0 my-4'>&copy; Copyright 2024. All Rights Reserved. </p>
<div className='w-full sm:w-auto flex justify-center items-center '>

<div className='flex flex-col xs:flex-row gap-2'>
  <p>Terms</p>
  <p>Privacy</p>
  <p>Cookies</p>
</div>
</div>
  </div>
</footer>
  )
}

export default Footer