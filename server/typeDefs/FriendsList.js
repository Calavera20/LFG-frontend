export const typeDefs = `
    type FriendsList {
        friends: [Friend]
        pending: [Friend]
        invited: [Friend]
    }

    type Friend{
        id: String!
        username: String!
    }
`;