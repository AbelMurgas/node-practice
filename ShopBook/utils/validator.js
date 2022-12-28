const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const isImageURL = require("image-url-validator").default;

exports.login = [
  check("email")
    .isEmail()
    .normalizeEmail()
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
];

exports.signup = [
  check("email")
    .isEmail()
    .normalizeEmail()
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
    .trim(),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("This password not match");
      }
      return true;
    }),
];

exports.addProduct = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .custom(value => {
        if (/\d/.test(value)){
            throw new Error("Title must be strings no number")
        }
        return value
    }),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 1, max: 100 })
    .withMessage("the price must be a numeric data between 1.00$ to 100.00$"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isLength({ max: 250 })
    .withMessage("The description must be less thant 250 letter"),
  body("imageUrl")
    .notEmpty()
    .withMessage("Image url is required")
    .custom((value) => {
      return isImageURL(value).then((is_image) => {
        if (!is_image) {
          return Promise.reject("The image url not found");
        }
        return value;
      });
    }),
];
