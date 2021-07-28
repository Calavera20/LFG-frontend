import { ApolloServer} from "apollo-server-express";
import express from "express";
import {typeDefs as UserDefs} from "./typeDefs/User";
import {typeDefs as QueryDefs} from "./typeDefs/Query";
import {typeDefs as MutationDefs} from "./typeDefs/Mutation";
import {resolvers as Mutation} from "./resolvers/Mutation";
import {resolvers as Query} from "./resolvers/Query";
import {connectDB, db} from "./dbConnector";

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

  const server = new ApolloServer({ typeDefs: [QueryDefs, MutationDefs, UserDefs], resolvers });
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startApolloServer();
