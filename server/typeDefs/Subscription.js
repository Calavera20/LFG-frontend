
export const typeDefs = `

    type Subscription {
        messageAdded(channelId: ID!): Message
    }`;