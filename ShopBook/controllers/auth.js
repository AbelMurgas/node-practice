const crypto = require("crypto"); // Token
const bcrypt = require("bcryptjs"); // Crypting
const { validationResult } = require("express-validator");

const EmailManagement = require("../utils/email");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: req.flash("err"),
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

exports.getResetPassword = (req, res, next) => {
  res.render("auth/reset", {
    path: "/reset password",
    pageTitle: "Signup",
    errorMessage: req.flash("err"),
  });
};

exports.getNewPassword = (req, res, next) => {
  const message = req.flash("err");
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      res.render("auth/new-pass", {
        path: "/new password",
        pageTitle: "Signup",
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    const errorsList = errors.map((data, index) => {
      return data.msg
    })
    return res.status(422).render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: errorsList,
    });
  }
  User.findOne({ email: email })
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

exports.postSignup = (req, res, next) => {
  const emailUser = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    const errorsList = errors.map((data, index) => {
      return data.msg
    })
    return res.status(422).render("auth/signup", {
      path: "/signup",
      pageTitle: "Signup",
      errorMessage: errorsList,
    });
  }
  return bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: emailUser,
        password: hashedPassword,
        cart: {
          item: [],
        },
      });
      return user.save();
    })
    .then((result) => {
      const subject = "Signup succeeded!";
      const html = "<h1>You successfully sign up!</h1>";
      newEmail = new EmailManagement(emailUser, subject, html);
      newEmail
        .sendEmail()
        .then((result) => {
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postResetPassword = (req, res, next) => {
  const emailUser = req.body.email;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    User.findOne({ email: emailUser })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        const html = `
          <p>You requested a password reset</p>
          <p>Click <a href="http://localhost:8000/reset/${token}">here</a> to reset your password</p>
          `;
        const subject = "Password reset";
        newEmail = new EmailManagement(emailUser, subject, html);
        newEmail.sendEmail();
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postNewPassword = (req, res, next) => {
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  const password = req.body.password;
  User.findOne({
    _id: userId,
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      const userOwner = user;
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        userOwner.password = hashedPassword;
        userOwner.resetToken = undefined;
        userOwner.resetTokenExpiration = undefined;
        return userOwner.save();
      });
    })
    .then(res.redirect("/login"))
    .catch((err) => {
      console.log(err);
    });
};
