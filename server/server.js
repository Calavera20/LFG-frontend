
// import { typeDefs as UserDefs } from "./typeDefs/User";
// import { typeDefs as QueryDefs } from "./typeDefs/Query";
// import { typeDefs as MutationDefs } from "./typeDefs/Mutation";
// import { typeDefs as GameCardDefs } from "./typeDefs/GameCard";
// import { typeDefs as GroupDefs } from "./typeDefs/Group";
// import { typeDefs as FriendsListDefs } from "./typeDefs/FriendsList";
// import { typeDefs as MessageDefs } from "./typeDefs/Message";
// import { typeDefs as SubscriptionDefs } from "./typeDefs/Subscription";
// import { resolvers as Mutation } from "./resolvers/Mutation";
// import { resolvers as Query } from "./resolvers/Query";
// import { resolvers as Subscription } from "./resolvers/Subscription";
import { connectDB, db } from "./dbConnector";
const { GraphQLServer, PubSub } = require("graphql-yoga");

// import permissions from "./permissions/Permissions";

import { createServer } from "http";

async function startApolloServer() {
  await connectDB();

  db.on("error", () => {
    console.error("Error while connecting to DB");
  });

  // const resolvers = {
  //   Mutation,
  //   Query,
  //   Subscription
  // };

  // const typeDefs = gql(
  //   QueryDefs + MutationDefs + UserDefs + GameCardDefs + GroupDefs + FriendsListDefs 
  //   + MessageDefs 
  //   + SubscriptionDefs
  // );


  const messages = [];

const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }
  type Query {
    messages: [Message!]
  }
  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }
  type Subscription {
    messages: [Message!]
  }
`;

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      subscribers.forEach((fn) => fn());
      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() => pubsub.publish(channel, { messages }));
        setTimeout(() => pubsub.publish(channel, { messages }), 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

//   const server = new ApolloServer({
//     schema: applyMiddleware(
//       buildFederatedSchema([{ typeDefs, resolvers }])
//       // permissions
//     ),
//     context: ({ req }) => {
//       const user = req.user || null;
//       return { user };
//     },
//   });
//   const app = express();

//   const httpServer = createServer(app);

//   app.use(
//     expressJwt({
//       secret: "TODO",
//       algorithms: ["HS256"],
//       credentialsRequired: false,
//     })
//   );

//   await server.start();
//   server.applyMiddleware({ app });

//   SubscriptionServer.create(
//     {
//       schema: applyMiddleware(
//         buildFederatedSchema([{ typeDefs, resolvers }])),
//       execute,
//       subscribe
//     },
//     {
//       server: httpServer,
//       path: server.graphqlPath,
//     }
//   );

//   httpServer.listen({ port: 4000 }, () =>
//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
//   );
// }
const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
}
 startApolloServer();


