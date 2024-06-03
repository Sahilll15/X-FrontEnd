import type { NextPage } from "next";
import TwitterLayout from "./components/TwitterLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { getCurrentUserQuery } from "@/graphql/query/user";
import {  userCurretUser, userGetUSerById } from "@/hooks/user";
import FeedCard from "./components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { useParams } from "next/navigation";
import { graphql } from "@/gql";
import { graphqlClient } from "@/clients/api";
import { FollowUserMutatation, UnFollowUserMutatation } from "@/graphql/mutations/user";
import { useQueryClient } from "@tanstack/react-query";


const userProfilePage: NextPage = () => {
    const {user}=userCurretUser();
    const queryClient=useQueryClient();


    const params=useParams();
  
    const {userById}=userGetUSerById(params?.id as string);


    const handleFollow =async()=>{

        await graphqlClient.request(FollowUserMutatation,{
            to:params?.id as string
        })

        queryClient.invalidateQueries({
            queryKey:['getUserById']
        })

    
    }

   const  handleUnFollow=async()=>{
        await graphqlClient.request(UnFollowUserMutatation,{
            to:params?.id as string
        })

        queryClient.invalidateQueries({
            queryKey:['getUserById']
        })
    }

    
    const isFollowing=userById?.followers?.some((follower)=>follower?.id===user?.id);

   


    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className="border flex items-center gap-4 py-4 px-3">
                <BsArrowLeftShort className="text-4xl" />
                <div>

                <div className="text-2xl">
                    {
                        userById?.firstName + " " + userById?.lastName || "User Name"
                    }
                </div>
                <div className="text-sm text-gray-500">
                    {
                        userById?.tweets?.length || 0
                    } Tweets
                    </div>
                </div>
                    </nav>
                    <div className="p-4 border-2">
                        {
                            userById?.profileImageURL && (
                                <Image className="rounded-full" src={userById.profileImageURL} alt="user image"  width={200} height={200}/>
                            )
                        }

                        <h1 className="text-lg">
                                {
                                    userById?.firstName + " " + userById?.lastName || "User Name"
                                }
                        </h1>

                        <div className="flex  gap-8">
                            <h1>Followers {userById?.followers?.length}</h1>
                            <h1>Following {userById?.following?.length}</h1>

                            {
    user?.id !== userById?.id && (
        isFollowing ? (
            <button onClick={handleUnFollow} className="bg-white text-black px-4 py-2 rounded-full">Unfollow</button>
        ) : (
            <button onClick={handleFollow} className="bg-white text-black px-4 py-2 rounded-full">Follow</button>
        )
    )
}

                          
                            </div>
                    </div>

                    <div>
                        {
                            userById?.tweets?.map((tweet) => (
                                tweet ? <FeedCard data={tweet as Tweet} key={tweet?.id} /> : null
                            ))
                        }
                    </div>

                    <div>

                    </div>
                </div>
            </TwitterLayout>
        </div>
    );
}

export default userProfilePage;