import { gql } from "apollo-server-express";

export const typeDefs = `

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    signup(username: String!, password: String!): String
  }
`;
