const path = require("path");
const config = require("./config.js");
const fs = require("./utils/fileStorage");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const csrf = require("csurf");
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: `mongodb+srv://${config.DBUSER}:${config.DBPASS}@cluster0.ssc1tcl.mongodb.net/shop?retryWrites=true&w=majority`,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(fs.dowloadImage);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static("images"));

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    User.findById(req.session.user._id)
      .then((user) => {
        if (!user) {
          next();
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        next(new Error(err));
      });
  }
});

app.use(flash());

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get("/500", errorController.get500);
app.use(errorController.get404);

app.use((error, req, res, next) => {
  res
    .status(500)
    .render("500", { pageTitle: "Error occurred", path: res.path });
});

mongoose
  .connect(
    `mongodb+srv://${config.DBUSER}:${config.DBPASS}@cluster0.ssc1tcl.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    app.listen(config.PORT, config.HOST, () => {
      console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
