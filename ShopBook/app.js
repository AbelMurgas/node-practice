const path = require("path");
const config = require("./config.js");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const csrf = require('csurf')
const flash = require('connect-flash')
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// const mongoConnect = require("./utils/database").mongoConnect;

const User = require("./models/user");
/*
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
*/

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
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);


app.use(csrf())


app.use((req, res, next) => {
  if (!req.session.user) {
    next();
  } else{
    User.findById(req.session.user._id).then((user) => {
      req.user = user;
      next();
    });
  }
});

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use(flash());

// app.use((req, res, next) => {
//   User.findById("63870fae5a31c96514456132")
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch();
// });
/* --- SEQUELIZE
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch();
  });
  */

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

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

/* --- SEQUELIZE ---
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem} )

let user;
sequelize
  .sync()
  //.sync({ force: true})
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Max",
        email: "abelmurgasdev@gamil.com",
        passWord: "1234",
      });
    }
    return user;
  })
  .then(user =>{
    return user.createCart();
  })
  /*
  .then(cart => {
    if (cart){
      return cart
    }
    return user.createCart();
  })
  
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
*/
/*
mongoConnect((client) => {
  app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
  });
});
*/
