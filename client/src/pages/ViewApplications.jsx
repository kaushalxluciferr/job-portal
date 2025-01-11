import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

function ViewApplications() {
  return (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm '>
            <thead>
                <tr className='border-b-2'>
                    <th className='py-2 px-4 text-left'>SN</th>
                    <th className='py-2 px-4 text-left'>Username</th>
                    <th className='py-2 px-4 text-left max-sm:hidden'>Job Title</th>
                    <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
                    <th className='py-2 px-4 text-left'>Resume</th>
                    <th className='py-2 px-4 text-left'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    viewApplicationsPageData.map((item,index)=>(
                        <tr key={index} className='text-gray-700 '>
                            <td className='py-2 px-4 border-b text-center'>{index+1}</td>
                            <td className='py-2 px-4 border-b text-center flex' ><img className='w-10 h-10 rounded-full mr-3 max-sm:hidden ' src={item.imgSrc} alt="" />
                            <span>{item.name}</span>
                            </td>
                            <td className='py-2 px-4 border-b max-sm:hidden'>
                                {item.jobTitle}
                            </td  >
                            <td className='py-2 px-4 border-b max-sm:hidden'>{item.location}</td>
                            <td className='py-2 px-4 border-b'>
                                <a className='bg-blue-50 px-2 py-2 rounded inline-flex gap-2' href="" target='_blank'>Resume <img src={assets.resume_download_icon} alt="" /></a>
                            </td>
                            <td className='py-2 px-4 border-b relative'>
                                <div className='relative inline-block text-left group'>
                                    <button className='action-button'>...</button>
                                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-4 w-32 bg-white border border-gray-300 rounded-md shadow group-hover:block  '>
                                        <button className='block w-full text-left px-4 py-2 bg-green-400 rounded-md hover:bg-fuchsia-200'>Accept</button>
                                        <button className='block w-full text-left px-4 py-2 bg-red-400 rounded-md hover:bg-gray-400'>Reject</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications
