import { gql } from "apollo-server-express";

export const typeDefs = `
  type Query {
    hello: String
    getGameCards: [GameCard]
  }
`;
