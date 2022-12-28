const express = require("express");

const validator = require("../utils/validator");

const adminProductCrontoller = require("../controllers/adminProduct");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-product", isAuth, adminProductCrontoller.getAddProduct);

router.post(
  "/add-product",
  isAuth,
  validator.addProduct,
  adminProductCrontoller.postAddProduct
);

router.get("/products", isAuth, adminProductCrontoller.getHomeAdmin);

router.get(
  "/edit-product/:productID",
  isAuth,
  adminProductCrontoller.getEditAdmin
);

router.post("/edit-product/", isAuth, adminProductCrontoller.postEditAdmin);

router.post("/delete-product/", isAuth, adminProductCrontoller.postDeleteAdmin);

module.exports = router;
