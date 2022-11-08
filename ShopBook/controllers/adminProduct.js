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
  product.save();
  res.redirect("/");
};

exports.getHomeAdmin = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getEditAdmin = (req, res) => {
  const productId = req.params.productID;
  Product.fetch(productId, (product) => {
    res.render("admin/edit-product", {
      prod: product,
      pageTitle: "Edit Product",
      id: productId,
      path: ""
    });
  });
};

exports.postEditAdmin = (req, res) => {
  const  productObject = {
    id: req.body.id,
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description
  };
  Product.updateByID(productObject, () => {
    res.redirect("/admin/products")
  });
};

exports.postDeleteAdmin = (req, res) => {
  const  productId = req.body.id;
  Product.deleteByID(productId, () => {
    res.redirect("/admin/products")
  });
};
