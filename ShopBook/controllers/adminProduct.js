const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getHomeAdmin = (req, res) => {
  Product.fetchAll().then(([row, fieldata]) => {
    res.render("admin/products", {
      prods: row,
      pageTitle: "Products",
      path: "/admin/products",
      hasProducts: row.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getEditAdmin = (req, res) => {
  const productId = req.params.productID;
  Product.fetchByID(productId).then(([product]) => {
    res.render("admin/edit-product", {
      prod: product[0],
      pageTitle: "Edit Product",
      id: productId,
      path: "",
    });
  }).catch(err => console.log(err));
};

exports.postEditAdmin = (req, res) => {
  const productObject = {
    id: req.body.id,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  };
  Product.updateByID(productObject).then(() => res.redirect("/admin/products")).catch(err => console.log(err));
};

exports.postDeleteAdmin = (req, res) => {
  const productId = req.body.id;
  Product.deleteByID(productId).then(() => res.redirect("/admin/products")).catch(err => console.log(err))
};
