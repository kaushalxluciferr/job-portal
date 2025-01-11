import React from 'react'
import { assets } from '../assets/assets'

function Download() {
  return (
    <div className='container px-10 2xl:px-20 mx-auto my-20'>
        <div className='relative bg-gradient-to-r from-violet-50 to-purple-300 rounded-lg p-12 sm:p-24 lg:p-20'>
            <div >
                <h1 className='text-2xl sm:text-4xl font-bold mb-8 max-w-md'>Download Mobile App for Better Experience</h1>
                <div className='flex gap-4'>
                    <a href="#" className='inline-block'><img src={assets.play_store} className='h-20' alt="" /></a>
                    <a href="#" className='inline-block'><img src={assets.app_store} className='h-20' alt="" /></a>
                </div>
            </div>
            <img src={assets.app_main_img} className='absolute w-80 right-0 bottom-0 mr-32 max-lg:hidden' alt="" />
        </div>
      
    </div>
  )
}

export default Download
