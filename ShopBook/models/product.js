const fs = require("fs");

const path = require("path");

const pathModule = require("../utils/path");
//const products = [];

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description
  }

  save() {
    this.id = Math.random().toString();
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
    getProductsFromFile(callback)
  }

  static fetch(idProduct ,callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === idProduct);
      callback(product)
    })
  }

  static updateByID(productObject, callback){
    getProductsFromFile(produts => {
      const newProducts = produts.map(prod => {
        if (prod.id === productObject.id){
          return productObject
        }
        return prod
      })
      fs.writeFile(p, JSON.stringify(newProducts), (err) => {
        if (err) {
          console.log(err);
        }
        callback()
      });
    })
  }

  static deleteByID(productId, callback){
    getProductsFromFile(produts => {
      const newProducts = produts.filter(prod => prod.id !== productId)
      fs.writeFile(p, JSON.stringify(newProducts), (err) => {
        if (err) {
          console.log(err);
        }
        callback()
      });
    })
  }
};
