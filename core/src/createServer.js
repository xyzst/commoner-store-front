const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation'); // Mutation Resolver
const Query = require('./resolvers/Query');   // Query Resolver
const db = require('./db');


// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
      Mutation: Mutation,
      Query: Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;