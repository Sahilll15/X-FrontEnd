import { graphqlClient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphql/query/user"
import { useQuery } from "@tanstack/react-query"

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