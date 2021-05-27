const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const compression = require('compression');
const bodyParser = require('body-parser');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const { authorizeUser } = require('./middleware/auth');

const port = process.env.PORT || 3001;

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const context = ({ req }) => {
  const user = authorizeUser(req);
  return { user };
};

// TODO: Remove playground and introspection once complete integration with Client is done
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
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

app.use(bodyParser.json()); //application/json

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

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

// Redirecting '/' to '/graphql'
app.get('/', (req, res, next) => {
  res.redirect('/graphql');
});

server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
