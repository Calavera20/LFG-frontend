import {gql } from "apollo-server-express";

export const typeDefs = gql`
    type AuthPayload {
        token: String
        user: User
    }
  
    type User {
        id: ID!
        username: String!
        friendsList: FriendsList
    }
`;