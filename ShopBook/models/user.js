const mongodb = require("mongodb");
const Product = require("./product");
const ObjectId = mongodb.ObjectId;
const getDb = require("../utils/database").getDb;
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log("User saved");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    const db = getDb();
    const productUpdateIndex = this.cart.items.findIndex(
      (obj) => obj.productId.toString() === product._id.toString()
    );
    if (productUpdateIndex < 0) {
      this.cart.items.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    } else {
      this.cart.items[productUpdateIndex].quantity =
        this.cart.items[productUpdateIndex].quantity + 1;
    }
    //productUpdate.quantity = productUpdate.quantity + 1
    /*
    const updateCart = {
      items: [
        {
          productId: new ObjectId(product._id),
          quantity: 1,
        },
      ],
    };*/
    return db
      .collection("users")
      .updateOne({ _id: ObjectId(this._id) }, { $set: { cart: this.cart } })
      .then((result) => {
        console.log("User Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      });

    /* --- way to getCart before know find method with $in
    const products = await Promise.all(
      this.cart.items.map((items) => {
        return Product.findByPk(items.productId.toString());
      })
    );
    return products.map((product) => {
      return {
        ...product,
        quantity: this.cart.items.find((p) => {
          return p.productId.toString() === product._id.toString();
        }).quantity,
      };
    });
    */
  }

  deleteItemFromCart(productId) {
    const db = getDb();
    const updCart = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString(); // act cart items
    });
    console.log(this.cart.items);
    return db
      .collection("users")
      .updateOne(
        { _id: ObjectId(this._id) },
        {
          $set: {
            cart: {
              items: updCart,
            },
          },
        }
      )
      .then((result) => {
        console.log("User cart item Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: this._id,
            name: this.name,
            emailUsed: this.email,
          },
        };
        return order;
      })
      .then((order) => {
        return db
          .collection("orders")
          .insertOne(order)
          .then((result) => {
            return db
              .collection("users")
              .updateOne(
                { _id: ObjectId(this._id) },
                {
                  $set: {
                    cart: {
                      items: [],
                    },
                  },
                }
              )
              .then((result) => {
                console.log("User cart item Updated");
              })
              .catch((err) => {
                console.log(err);
              });
          });
      });
  }

  getOrders() {
    const db = getDb();
    return db.collection("orders").find({'user._id': this._id}).toArray();
  }

  static findByPk(idUser) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(idUser) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
/* --- SEQUELIZE ---
const Sequelize = require('sequelize');

const sequelize = require('../utils/database')

const User = sequelize.define('user',
{
 id: {
  type: Sequelize.INTEGER,
  autoIncrement: true,
  allowNull: false,
  primaryKey:true
 },
 name:{
  type: Sequelize.STRING,
  unique: true,
  allowNull: false,
 },
 email: {
  type: Sequelize.STRING,
  allowNull: false,
 },
 passWord:{
  type: Sequelize.STRING,
  allowNull: false,
 }
}
);
*/
module.exports = User;
