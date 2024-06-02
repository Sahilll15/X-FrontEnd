import Image from 'next/image';
import React from 'react'
import { FiMessageCircle } from 'react-icons/fi';
import {FaRetweet} from 'react-icons/fa'
import {CiHeart} from 'react-icons/ci'
import {MdOutlineFileUpload} from 'react-icons/md'

const FeedCard :React.FC= () => {
  return ( 
<div className=' border-b-2 border-gray-700  hover:bg-gray-900  transition-all cursor-pointer'>
    <div className='grid grid-cols-12 p-5 '>
    <div className='col-span-1 '>
    <Image 
      src='https://avatars.githubusercontent.com/u/109215419?s=40&v=4'
      height={50}
      width={50}
      alt='profile image'
      className='rounded-full'
      />


      
    </div>
    <div className='col-span-11 '>
    <p className='font-bold'>sahil chalke</p>

    <p className='text-gray-500'>@sahilchalke</p>

    <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, hic.
    </p>

    
    <div className='flex text-2xl mt-2 px-10 justify-between items-center  '>
    <div>
    <FiMessageCircle />
    </div>
    <div>
    <FaRetweet />
    </div>
    <div>
    <CiHeart />
    </div>
    <div>
    <MdOutlineFileUpload />
    </div>
    </div>
  

    </div>

    </div>



    </div>



  )
}

export default FeedCard;
