import { graphqlClient } from "@/clients/api";
import { CreateTweetData, CreateTweetInput } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutations/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useGetALLTweets=()=>{
    const query=useQuery({
        queryKey:['all-tweets'],
        queryFn:()=>graphqlClient.request(getAllTweetsQuery)
    })

    return {
        ...query,
        tweets:query.data?.getAllTweets
    }
}

export const useCreateTweet = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload:CreateTweetData) => graphqlClient.request(createTweetMutation, {
            payload: {
                ...payload,
                content: payload.content || "",
                imageURL: payload.imageURL || "",
            }
        }),

        onMutate: () => {
            toast.loading("Creating tweet", {
                id: 'creating-tweet'
            });
        },

        onSuccess: async() => {
           await queryClient.invalidateQueries({
                queryKey: ['all-tweets']
            });
            toast.success("Tweet created", {
                id: 'creating-tweet'
            });
           
        },

     

     
    });

    return mutation;
};