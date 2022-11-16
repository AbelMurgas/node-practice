const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Home",
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const productId = req.params.productID;
  Product.findByPk(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        prod: product,
        pageTitle: "Detail",
        path: "/products",
        id: productId,
      });
    })
    .catch((err) => console.log(err));
};
