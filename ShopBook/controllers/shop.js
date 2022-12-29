const fs = require("fs");
const rootPath = require("../utils/path");
const path = require("path");

const PDFDocument = require("pdfkit");

const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Home",
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  const productId = req.params.productID;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-detail", {
        prod: product,
        pageTitle: "Detail",
        path: "/products",
        id: productId,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ userId: req.user })
    .populate("cart.items.productId")
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .populate("cart.items.productId")
    .then((order) => {
      if (!order) {
        return next(new Error("No order found."));
      }
      if (req.user._id.toString() !== order.userId.toString()) {
        return next(new Error("Unauthorized"));
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join(
        rootPath + "/data/" + "/invoices/" + invoiceName
      );
      const doc = new PDFDocument();
      res.setHeader(
        "Content-disposition",
        'inline; filename="' + invoiceName + '"'
      );
      res.setHeader("Content-type", "application/pdf");
      doc.pipe(fs.createWriteStream(invoicePath));
      doc.pipe(res);
      doc.fontSize(26).text("Invoice", {
        underline: true,
      });
      doc.text("------------------------");
      let totalPrice = 0;
      order.cart.items.forEach((element) => {
        doc.fontSize(18);
        doc.text(
          element.productId.title +
            "-" +
            element.quantity +
            " x " +
            "$" +
            element.productId.price
        );

        totalPrice += element.productId.price * element.quantity;
      });
      doc.text("Total price: $" + totalPrice);
      doc.end();
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const userId = req.user._id;
  const email = req.user.email;
  const cart = req.user.cart;
  const order = new Order({
    userId: userId,
    email: email,
    cart: cart,
  });
  order
    .save()
    .then((result) => {
      User.findByIdAndUpdate(req.user._id, { cart: [] }).then((result) => {
        res.redirect("/orders");
      });
    })
    .catch((err) => console.log(err));
};
