const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //const isLoggedIn = req.get("Cookie").split("=")[1].trim();
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("63870fae5a31c96514456132").then((user) => {
    req.session.user = user;
    req.session.isLoggedIn = true;
    res.redirect("/");
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/")
  })
};
