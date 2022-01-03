import { gql } from "apollo-server-express";

export const typeDefs = `

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    signup(username: String!, email: String!, password: String!): String
    createGroup(description: String!, creator: String!, playerLimit: String!, gameId: String!): String
    sendMessage(content: String!, creator: String!, creationDate: String!): String
    friendInvite(userData: InputFriend, inviteeData: InputFriend): String
    acceptFriendInvite(userData: InputFriend, inviteeData: InputFriend): String
    emailInvite(userData: InputFriend, inviteeData: InputFriend): String
    addMessage(message: MessageInput): Message
  }
`;
