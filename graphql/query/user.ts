import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);


export const getCurrentUserQuery=graphql(`
      query GetCurrentUser {
        getCurrentUser {
          id,
          email,
          profileImageURL,
          firstName,
          lastName,
          following {
            email
            id
            firstName
            profileImageURL
          },
          followers {
            email
            id
            firstName
            profileImageURL
          },
          tweets{
            id,
            content,
            imageURL,
            author{
              profileImageURL,
              firstName,
              lastName
              id
            }
          }
        }
      }
    `)


  export const getUserByIdQuery=graphql(
    `
    query GetUserById($userId: String!) {
      getUserById(userId: $userId) {
        firstName
        lastName
        profileImageURL
        createdAt
        updatedAt
        id
        following {
          email
          firstName
          profileImageURL
          id
        },
        followers {
          email
          firstName
          profileImageURL
          id
        },
        tweets{
          id
          content
          imageURL
          author{
            id
            firstName
            lastName
            profileImageURL
          }
        }
        
      }
    }
    `
  )



