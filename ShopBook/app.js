const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoConnect = require('./utils/database').mongoConnect;

const User = require('./models/user')
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

app.set("view engine", "ejs");
app.set("views", "views");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");
/*
*/

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk('637bc218d1d4c9d215112d0d')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart , user._id)
      next();
    })
    .catch();
  /* --- SEQUELIZE
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch();
  */
});

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes.routes);
app.use(errorController.get404);



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
mongoConnect((client) => {
  app.listen(3000)
})