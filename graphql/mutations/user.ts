import { graphql } from "@/gql"


export const FollowUserMutatation=graphql(
    `#graphql
    mutation FollowUser($to: ID!) {
        followUser(to: $to)
      }
    `
  )



export const UnFollowUserMutatation=graphql(
    `
    mutation UnfollowUser($to: ID!) {
        unfollowUser(to: $to)
      }
      `
)

