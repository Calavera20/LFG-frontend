import { ApolloServer} from "apollo-server-express";
import express from "express";
import {typeDefs as UserDefs} from "./typeDefs/User";
import {typeDefs as QueryDefs} from "./typeDefs/Query";
import {typeDefs as MutationDefs} from "./typeDefs/Mutation";
import {resolvers as Mutation} from "./resolvers/Mutation";
import {resolvers as Query} from "./resolvers/Query";
import {connectDB, db} from "./dbConnector";
import expressJwt from 'express-jwt';
import permissions from './permissions/Permissions'
import { applyMiddleware } from "graphql-middleware";
import { buildFederatedSchema} from "@apollo/federation"
import {gql } from "apollo-server-express";

async function startApolloServer() {
    await connectDB();
    
    db.on('error', () => {
        console.error("Error while connecting to DB");
    });
  // Construct a schema, using GraphQL schema language
//   const typeDefs = gql`

//     type Message{
//         user: User!
//         content: String!
//     }

//     type Chat {
//         id: ID!
//         messages: [String!]
//         members: [User!]!
//         owner: User!
//     }

  // Provide resolver functions for your schema fields
  const resolvers = {
    Mutation,
    Query
  };

  const typeDefs = gql(QueryDefs+MutationDefs+UserDefs);

  const server = new ApolloServer({
    schema: applyMiddleware(
      buildFederatedSchema([{typeDefs, resolvers}]),
      permissions
    ),
  context: ({req}) => {
    const user = req.user || null;
    return { user }
  } });
  const app = express();

  app.use(
    expressJwt({
      secret: "TODO",
      algorithms: ["HS256"],
      credentialsRequired: false
    })
  );

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer();