const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fielData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Home",
        path: "/",
        hasProducts: rows.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fielData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "Products",
        path: "/products",
        hasProducts: rows.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const productId = req.params.productID;
  Product.fetchByID(productId)
    .then(([product]) => {
      console.log(product)
      res.render("shop/product-detail", {
        prod: product[0],
        pageTitle: "Detail",
        path: "/products",
        id: productId,
      });
    })
    .catch((err) => console.log(err));
};
