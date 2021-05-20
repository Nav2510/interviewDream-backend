const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const helmet = require('helmet');
const compression = require('compression');

const graphqlSchemas = require('./graphql/schemas');
const graphqlResolvers = require('./graphql/resolvers');

const port = process.env.PORT || 3001;

const app = express();

// Securing app using helmet
app.use(helmet());

// Optimizing using compression
app.use(compression());

// TODO: Move is to middleware folder
// Allowing various CORS headers, methods
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Graphql setup
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchemas,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.MONGO_ATLAS_URI)
  .then((result) => {
    console.log('Mogno atlas connected!!');
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error(`Mongodb connection failed with error: ${error}`);
  });
