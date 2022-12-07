const product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.getHomeAdmin = (req, res) => {
  const user = req.session.user
  Product.find({userId: user})
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Products",
        path: "/admin/products",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditAdmin = (req, res) => {
  const productId = req.params.productID;
  Product.findById(productId)
    .then((product) => {
      product = product;
      res.render("admin/edit-product", {
        prod: product,
        pageTitle: "Edit Product",
        path: "",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.session.user,
  });
  product
    .save()
    .then((result) => {
      console.log("Create Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/add-product");
    });
};

exports.postEditAdmin = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const newProduct = {
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.session.user,
  };
  product.findByIdAndUpdate(id,newProduct)
    .then((result) => {
      console.log("UPDATED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteAdmin = (req, res) => {
  const productId = req.body.id;
  Product.findByIdAndRemove(productId)
    .then((result) => {
      console.log("DELETED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};