// Rauf Anata - 101220889

const express = require("express");
const { ApolloServer} = require("apollo-server-express");
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers');
const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const DB_CONNECTION_STRING =
 process.env.DB;

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("101220889 - Assignment 1")
  })

  await mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection')
  });

  app.listen(4000, () => console.log("Server running on port 4000"));
}
startServer();
