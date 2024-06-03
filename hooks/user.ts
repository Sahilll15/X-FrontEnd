import { graphqlClient } from "@/clients/api"
import { FollowUserMutatation, UnFollowUserMutatation } from "@/graphql/mutations/user"
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user"
import { useMutation, useQuery } from "@tanstack/react-query"

export const userCurretUser=()=>{
    const query=useQuery(
            {
                queryKey:["getCurrentUser"],
                queryFn:()=>graphqlClient.request(getCurrentUserQuery)
            }
    )

    return {
        ...query,
        user:query.data?.getCurrentUser
    }
}

export const userGetUSerById=(userId:string)=>{
    const query=useQuery(
        {
            queryKey:["getUserById"],
            queryFn:()=>graphqlClient.request(getUserByIdQuery,{
                userId:userId
            })
        }
    )

    return {
        ...query,
        userById:query.data?.getUserById
    }
}

// export const useFollowQuery = () => {
//     const mutations = useMutation({
//         mutationFn: () => graphqlClient.request(FollowUserMutatation, {
//             payload: {
//                 to: userId
//             }
//         })
//     });

//     return mutations;
// };
 

// export const useUnFollowQuery = (userId: string) => { 
//     const mutations = useMutation({
//         mutationFn: () => graphqlClient.request(UnFollowUserMutatation, {
//             to: userId
            
//         })
//     })

//     return mutations;
// }