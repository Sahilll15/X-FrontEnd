import type { NextPage } from "next";
import TwitterLayout from "./components/TwitterLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { userCurretUser } from "@/hooks/user";
import FeedCard from "./components/FeedCard";
import { Tweet } from "@/gql/graphql";


const userProfilePage: NextPage = () => {
    const {user}=userCurretUser();
    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className="border flex items-center gap-4 py-4 px-3">
                <BsArrowLeftShort className="text-4xl" />
                <div>

                <div className="text-2xl">
                    sahil chalke
                </div>
                <div className="text-sm text-gray-500">
                    100 tweets
                    </div>
                </div>
                    </nav>
                    <div className="p-4 border-2">
                        {
                            user?.profileImageURL && (
                                <Image className="rounded-full" src={user.profileImageURL} alt="user image"  width={200} height={200}/>
                            )
                        }

                        <h1 className="text-lg">
                                {
                                    user?.firstName + " " +' '+ user?.lastName || "User Name"
                                }
                        </h1>
                    </div>

                    <div>
                        {
                            user?.tweets?.map((tweet) => (
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