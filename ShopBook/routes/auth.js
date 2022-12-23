const express = require("express");

const { check, body } = require("express-validator");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please insert a correct email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject("E-mail not exist");
          }
          return bcrypt
            .compare(req.body.password, user.password)
            .then((isEqual) => {
              if (!isEqual) {
                return Promise.reject("Password Incorrect");
              }
            });
        });
      }),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please insert a correct email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exist already, please pick a different one."
            );
          }
        });
      }),
    body("password", "The password is incorrect")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .withMessage(),
    body("confirmPassword")
      .equals(body("password"))
      .withMessage("This password not match"),
  ],
  authController.postSignup
);

router.get("/reset", authController.getResetPassword);

router.post("/reset", authController.postResetPassword);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
