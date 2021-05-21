const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const compression = require('compression');

const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');

const port = process.env.PORT || 3001;

const app = express();

// TODO: Remove playground and introspection once complete integration with Client is done
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  formatError: (error) => {
    if (!error.originalError) {
      return error;
    }
    const data = error.originalError.data;
    const message = error.message;
    const code = error.originalError.code;
    const msgCode = error.originalError.msgCode;
    return {
      message,
      status: code,
      msgCode,
      data,
    };
  },
});

// Optimizing using compression
app.use(compression());

// TODO: Move is to middleware folder
// Allows various CORS headers, methods
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_ATLAS_URI)
  .then(() => {
    console.log('Mongo atlas connected!!');

    app.listen({ port: port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    );
  })
  .catch((error) => {
    console.error(`Mongodb connection failed with error: ${error}`);
  });
