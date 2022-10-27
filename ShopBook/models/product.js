const fs = require("fs");

const path = require("path");

const pathModule = require("../utils/path");
//const products = [];

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(pathModule, "data", "products.json");
    fs.readFile(p, (err, data) => {
      let products = [];
      if (!err) {
        products = JSON.parse(data);
      } else {
        console.log(err);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    const p = path.join(pathModule, "data", "products.json");
    fs.readFile(p, (err, data) => {
      if (err) {
        console.log(err);
        callback([]);
      }
      callback(JSON.parse(data));
    });
  }
};
