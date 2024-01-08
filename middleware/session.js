const session = require("express-session");
const connectMongoSession = require("connect-mongodb-session")(session);
const URL = "mongodb://localhost:27017/BaseShop";
const store = new connectMongoSession({
  uri: URL,
  collection: "session",
});

module.exports = session({
  secret: "hey hey ",
  resave: false,
  saveUninitialized: false,
  store,
});