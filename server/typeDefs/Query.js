import { gql } from "apollo-server-express";

export const typeDefs = `
  type Query {
    hello: String
    getFriendsList(userId: String): FriendsList
    getGameCards: [GameCard]
    getGroupsForGameId(gameId: String): [Group]
    getUserData(username: String): User
  }
`;
