import Image from "next/image";
import { Inter } from "next/font/google";
import {BsTwitter} from 'react-icons/bs'
import {BiHomeCircle, BiHash, BiMoney, BiUser} from 'react-icons/bi'
import {BsBell, BsBookmark, BsEnvelope} from 'react-icons/bs'
import {SlOptions} from 'react-icons/sl'
import { useCallback, useMemo } from "react";
import FeedCard from "./components/FeedCard";
import {CredentialResponse, GoogleLogin} from '@react-oauth/google'



const inter = Inter({ subsets: ["latin"] });

interface TwitterSidebarButton{
  title:string,
  icon:React.ReactNode,
  link:string
}


const sidebarMenuItems: TwitterSidebarButton[] = 
[
    {
      title: "Home",
      icon: <BiHomeCircle />,
      link: "/",
    },
    {
      title: "Explore",
      icon: <BiHash />,
      link: "/",
    },
    {
      title: "Notifications",
      icon: <BsBell />,
      link: "/",
    },
    {
      title: "Messages",
      icon: <BsEnvelope />,
      link: "/",
    },
    {
      title: "Bookmarks",
      icon: <BsBookmark />,
      link: "/",
    },
    {
      title: "Twitter Blue",
      icon: <BiMoney />,
      link: "/",
    },
    {
      title: "Profile",
      icon: <BiUser />,
      link: `/user`,

    },
    {
      title: "More Options",
      icon: <SlOptions />,
      link: "/",
    },
  ]

  
export default function Home() {

  const handleLoginWithGoogle=useCallback((cred:CredentialResponse)=>{

  },[])

  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 border-r-2 border-r-slate-500  pt-6">
          <div className="hover:bg-gray-500 w-fit p-2 rounded-full">
          <BsTwitter className="text-6xl " />
          </div>
          <div className="mt-10 gap-10 flex flex-col text-2xl ">
          {sidebarMenuItems.map((item) => (
            <li className="flex justify-start items-start hover:bg-gray-600 p-2 rounded-full w-fit cursor-pointer">
              <a href={item.link} className="flex gap-2">
                {item.icon}
                <span className="font-bold">{item.title}</span>
              </a>
            </li>
          ))}


          </div>
         <div className="p-2 mt-10">
         <button className="flex justify-center bg-[#268CD8] w-full px-8 py-4 rounded-full ">
            Tweet
          </button>
         </div>
          
        </div>

        <div className="col-span-6 border-r-2 border-r-slate-500">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />    <FeedCard />
          
        </div>
        
        <div className="col-span-3  border-r-slate-500">
          <div className="bg-gray-700 p-4 rounded-xl">
          <h1 className="text-white font-bold mb-10">New To Twitter?</h1>
          <GoogleLogin 
            onSuccess={(cred)=>{
              console.log(cred)
            
            }}

            />
            </div>

        </div>
      </div>
    </div>
  );
}
