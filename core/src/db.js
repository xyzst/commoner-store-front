// Connects to the remote Prisma DB and allows for querying via JS

const { Prisma } = require('prisma-binding'); // There is no import in node.js, yet?

const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true
});

module.exports = db;