import { gql } from "apollo-server-express";

export const typeDefs = `
  type Mutation {
    login(username: String!, password: String!): String
    signup(username: String!, password: String!): String
  }
`;
