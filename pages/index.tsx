import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitter } from 'react-icons/bs';
import { BiHomeCircle, BiHash, BiMoney, BiUser, BiImage } from 'react-icons/bi';
import { BsBell, BsBookmark, BsEnvelope } from 'react-icons/bs';
import { SlOptions } from 'react-icons/sl';
import { useCallback, useState } from "react";
import FeedCard from "./components/FeedCard";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { userCurretUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetALLTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import { createTweetMutation } from '../graphql/mutations/tweet';
import TwitterLayout from "./components/TwitterLayout";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const { user } = userCurretUser();
  const {mutate}=useCreateTweet();
  const queryclient = useQueryClient();
  const {tweets}=useGetALLTweets();

  const [content,setContent]=useState('');
  const [image,setImage]=useState<File | null>(null);

  const handleSelectImage=useCallback(()=>{
      const input=document.createElement('input');
      input.setAttribute('type','file');
      input.setAttribute("accept",'image/*');
      input.click();
  },[])

  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) {
      return toast.error('User not found');
    }

    try {
      const { verifyGoogleToken } = await graphqlClient.request(verifyUserGoogleTokenQuery, { token: googleToken });
      toast.success('Success');
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem('___twitter_token', verifyGoogleToken);
      }

      queryclient.invalidateQueries({
        queryKey: ['getCurrentUser']
      });

    } catch (error) {
      console.error('Error verifying Google token:', error);
      toast.error('Error verifying Google token');
    }
  }, [queryclient]);


  const handleCreateTweet=useCallback(()=>{
    if(!content){
      return toast.error('Content is required');
    }

    mutate({
      content,
      imageURL:image?image.name:''
    })


    setContent('')

  },[content,mutate])

  return (
    // <div className={inter.className}>
    //   <div className="grid grid-cols-12 h-screen w-screen sm:px-4 md:px-8 lg:px-12 xl:px-16">
    //     <div className="col-span-3 border-r-2 border-r-slate-500 py-6 relative">
    //       <div className="hover:bg-gray-500 w-fit p-2 rounded-full">
    //         <BsTwitter className="text-6xl" />
    //       </div>
    //       <div className="mt-10 gap-10 flex flex-col text-2xl">
    //         {sidebarMenuItems.map((item, index) => (
    //           <li key={index} className="flex justify-start items-start hover:bg-gray-600 p-2 rounded-full w-fit cursor-pointer">
    //             <a href={item.link} className="flex gap-2">
    //               {item.icon}
    //               <span className="font-bold">{item.title}</span>
    //             </a>
    //           </li>
    //         ))}
    //       </div>
    //       <div className="p-2 mt-10">
    //         <button className="flex justify-center bg-[#268CD8] w-full px-8 py-4 rounded-full ">
    //           Tweet
    //         </button>
    //         {user && (
    //           <div className="absolute bottom-4 flex gap-4 items-center font-bold bg-gray-600 p-2 rounded-full">
    //             {user.profileImageURL && (
    //               <Image className="rounded-full" alt='profile' src={user.profileImageURL} height={50} width={50} />
    //             )}
    //             <h3>{user.firstName} {user.lastName}</h3>
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     <div className="col-span-9 lg:col-span-6">
    //       <div>

    //         <div className=' border-b-2 border-gray-700  hover:bg-gray-900  transition-all cursor-pointer'>

    //           <div className='grid grid-cols-12 p-5 '>
    //             <div className='col-span-1 '>
    //               {
    //                 user?.profileImageURL && (
    //                   <Image
    //                     src={user?.profileImageURL as string}
    //                     height={50}
    //                     width={50}
    //                     alt='profile image'
    //                     className='rounded-full'
    //                   />
    //                 )
    //               }
    //             </div>
    //             <div className="col-span-11">
                 
    //               <textarea value={content} onChange={(e)=>{
    //                 setContent(e.target.value);
    //               }}  className=" w-full bg-transparent p-3 text-xl border-b border-slate-700" rows={4} placeholder="whats upp?"/>
    //               <div className="text-2xl flex justify-between">
    //                 <BiImage onClick={handleSelectImage} />
    //                 <button onClick={handleCreateTweet} className="flex justify-center bg-[#268CD8] px-4 py-2 rounded-full text-sm ">
    //           Tweet
    //         </button>
    //               </div>
    //             </div>
    //             <div className='col-span-11 '>


    //               <div className='flex text-2xl mt-2 px-10 justify-between items-center  '>
    //                 <div>



    //                 </div>

    //               </div>



    //             </div>

    //           </div>
    //         </div>




    //       </div>
    //       {
    //         tweets?.map((tweet) => (
    //           tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
    //         ))
    //       } 
       
    //     </div>

    //     {!user && (
    //       <div className="col-span-12 lg:col-span-3">
    //         <div className="bg-gray-700 p-4 rounded-xl">
    //           <h1 className="text-white font-bold mb-10">New To Twitter?</h1>
    //           <GoogleLogin
    //             onSuccess={handleLoginWithGoogle}
    //           />
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <>
    <TwitterLayout>
    <div>

            <div className=' border-b-2 border-gray-700  hover:bg-gray-900  transition-all cursor-pointer'>

              <div className='grid grid-cols-12 p-5 '>
                <div className='col-span-1 '>
                  {
                    user?.profileImageURL && (
                      <Image
                        src={user?.profileImageURL as string}
                        height={50}
                        width={50}
                        alt='profile image'
                        className='rounded-full'
                      />
                    )
                  }
                </div>
                <div className="col-span-11">
                 
                  <textarea value={content} onChange={(e)=>{
                    setContent(e.target.value);
                  }}  className=" w-full bg-transparent p-3 text-xl border-b border-slate-700" rows={4} placeholder="whats upp?"/>
                  <div className="text-2xl flex justify-between">
                    <BiImage onClick={handleSelectImage} />
                    <button onClick={handleCreateTweet} className="flex justify-center bg-[#268CD8] px-4 py-2 rounded-full text-sm ">
              Tweet
            </button>
                  </div>
                </div>
                <div className='col-span-11 '>


                  <div className='flex text-2xl mt-2 px-10 justify-between items-center  '>
                    <div>



                    </div>

                  </div>



                </div>

              </div>
            </div>




          </div>
          {
            tweets?.map((tweet) => (
              tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
            ))
          } 
       
    </TwitterLayout>
    </>
  );
}
