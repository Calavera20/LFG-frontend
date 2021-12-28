export const typeDefs = `
    type FriendsList {
        friends: [Friend]
        pending: [Friend]
        invited: [Friend]
    }

    type Friend{
        id: String!
        username: String!
        email: String!
    }

    input InputFriend{
        id: String!
        username: String!
        email: String!
    }
`;