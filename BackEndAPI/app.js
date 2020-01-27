const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const debug = require("debug")("node-angular");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());
// Express body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cookie Parser
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("Connection Failed !!!"));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Routes
app.use("/users", require("./routes/users.js"));
app.use("/contacts", require("./routes/contact.js"));

// Listening on Port
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port, console.log(`Server started on port ${port}`));
