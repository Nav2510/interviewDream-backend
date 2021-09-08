const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const compression = require("compression");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const { auth } = require("./middleware/auth");
const messagesRoutes = require("./routes/messages");
const imageRoutes = require("./routes/images");
const ioUtil = require("./socket");

const port = process.env.PORT || 3001;

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const context = ({ req }) => {
  const user = auth.authorizeUser(req);
  return { user };
};

// TODO: Remove playground and introspection once complete integration with Client is done
const apolloServer = new ApolloServer({
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

app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded => <from>
app.use(express.json()); //application/json

// TODO: Move is to middleware folder
// Allows various CORS headers, methods
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// For saving files on server
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

// Route for uploading images
app.use("/image", imageRoutes);

// Route for handling images
app.use("/images", express.static(path.join(__dirname, "images")));

// Route for saving messages
app.use("/messages", messagesRoutes);

// Redirecting '/' to '/graphql'
app.get("/", (req, res, next) => {
  res.redirect("/graphql");
});

apolloServer.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo atlas connected!!");

    const server = app.listen({ port: port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
      )
    );
    const io = ioUtil.init(server);
    io.on("connection", ioUtil.handleConnection);
    io.on("connection", ioUtil.handleDisconnection);
    io.on("connection", ioUtil.emitExistingUsersToClient);
    io.on("connection", ioUtil.notifyExistingUsers);
    io.on("connection", ioUtil.handleMessage);
  })
  .catch((error) => {
    console.error(`Mongodb connection failed with error: ${error}`);
    console.error(
      `Tips: Check for the network access in case of mongo connection failure`
    );
  });
