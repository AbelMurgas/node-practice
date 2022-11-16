const db = require("../utils/database");

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageURL, description) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static fetchByID(idProduct) {
    return db.execute("SELECT * FROM products WHERE id = ?", [idProduct]);
  }

  static updateByID(productObject) {
    return db.execute(
      "UPDATE products SET title = ?, price = ?, description = ?, imageURL = ? WHERE id = ?", [productObject.title, productObject.price, productObject.description, productObject.imageUrl, productObject.id]
    );
  }

  static deleteByID(productId) {
    return db.execute("DELETE FROM products WHERE id = ?", [productId]);
  }
};
