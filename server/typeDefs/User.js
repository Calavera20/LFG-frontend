import {gql } from "apollo-server-express";

export const typeDefs = `
    type AuthPayload {
        token: String
        user: User
    }
  
    type User {
        id: ID!
        username: String!
    }
`;