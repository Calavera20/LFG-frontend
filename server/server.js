import { ApolloServer, graphiqlExpress } from "apollo-server-express";
import express from "express";
import { typeDefs as UserDefs } from "./typeDefs/User";
import { typeDefs as QueryDefs } from "./typeDefs/Query";
import { typeDefs as MutationDefs } from "./typeDefs/Mutation";
import { typeDefs as GameCardDefs } from "./typeDefs/GameCard";
import { typeDefs as GroupDefs } from "./typeDefs/Group";
import { typeDefs as FriendsListDefs } from "./typeDefs/FriendsList";
import { typeDefs as MessageDefs } from "./typeDefs/Message";
import { typeDefs as SubscriptionDefs } from "./typeDefs/Subscription";
import { resolvers as Mutation } from "./resolvers/Mutation";
import { resolvers as Query } from "./resolvers/Query";
import { resolvers as Subscription } from "./resolvers/Subscription";
import { connectDB, db } from "./dbConnector";
import expressJwt from "express-jwt";

import { execute, subscribe } from 'graphql';
import permissions from "./permissions/Permissions";
import { applyMiddleware } from "graphql-middleware";
import { buildFederatedSchema } from "@apollo/federation";
import { gql } from "apollo-server-express";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { createServer } from "http";

async function startApolloServer() {
  await connectDB();

  db.on("error", () => {
    console.error("Error while connecting to DB");
  });

  const resolvers = {
    Mutation,
    Query,
    Subscription
  };

  const typeDefs = gql(
    QueryDefs + MutationDefs + UserDefs + GameCardDefs + GroupDefs + FriendsListDefs 
    + MessageDefs 
    + SubscriptionDefs
  );

  const server = new ApolloServer({
    schema: applyMiddleware(
      buildFederatedSchema([{ typeDefs, resolvers }])
      // permissions
    ),
    context: ({ req }) => {
      const user = req.user || null;
      return { user };
    },
  });
  const app = express();

  const httpServer = createServer(app);

  app.use(
    expressJwt({
      secret: "TODO",
      algorithms: ["HS256"],
      credentialsRequired: false,
    })
  );

  await server.start();
  server.applyMiddleware({ app });

  SubscriptionServer.create(
    {
      schema: applyMiddleware(
        buildFederatedSchema([{ typeDefs, resolvers }])),
      execute,
      subscribe
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    }
  );

  httpServer.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer();
