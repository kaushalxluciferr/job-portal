import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo} className='max-sm:w-24' alt="" />
      <p className='flex-1 border-l  border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden '>@copyrights and all rights are reserved under Kaushal's Policy</p>
      <div className='flex gap-2'>
        <img src={assets.facebook_icon} className='max-sm:w-6'  alt="" />
        <img src={assets.instagram_icon} className='max-sm:w-6'  alt="" />
        <img src={assets.twitter_icon} className='max-sm:w-6'  alt="" />
      </div>
    </div>
  )
}

export default Footer
