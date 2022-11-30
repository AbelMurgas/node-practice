const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

// --- MongoDB ---
// const mongodb = require("mongodb");
// const getDb = require("../utils/database").getDb;
// class Product {
//   constructor(title, price, description, imageUrl, id, user) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageURL = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null ;
//     this.user = user;

//     // if (this._id) {
//     //   this._id = new mongodb.ObjectId(id);
//     // }
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     console.log("-----------", this._id);
//     if (this._id) {
//       // update the product
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       console.log("------------------");
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log("Product saved");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static findByPk(prodId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({
//         _id: new mongodb.ObjectId(prodId),
//       })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db.collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then((result) => {
//         console.log("Deleted");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// }

/* --- SEQUELIZE ----
const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
*/

// module.exports = Product;
