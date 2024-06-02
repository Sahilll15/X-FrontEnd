import Image from 'next/image';
import React from 'react'
import { FiMessageCircle } from 'react-icons/fi';
import {FaRetweet} from 'react-icons/fa'
import {CiHeart} from 'react-icons/ci'
import {MdOutlineFileUpload} from 'react-icons/md'
import { Tweet } from '@/gql/graphql';


interface FeedCardProps{
  data?: Tweet;
}

const FeedCard :React.FC<FeedCardProps>= (props) => {
  const {data}=props;
  return ( 
<div className=' border-b-2 border-gray-700  hover:bg-gray-900  transition-all cursor-pointer'>
    <div className='grid grid-cols-12 p-5 '>
    <div className='col-span-1 '>
    <Image 
      src={
        data?.author?.profileImageURL as string
      }
      height={50}
      width={50}
      alt='profile image'
      className='rounded-full'
      />


      
    </div>
    <div className='col-span-11 '>
    <p className='font-bold'>{
      data?.author?.firstName + ' ' + data?.author?.lastName
  
}</p>


    <p className='mt-4'>
    {data?.content}
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
