const express = require("express");

const adminProductCrontoller = require("../controllers/adminProduct");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-product", isAuth, adminProductCrontoller.getAddProduct);

router.post("/add-product", isAuth, adminProductCrontoller.postAddProduct);

router.get("/products", isAuth, adminProductCrontoller.getHomeAdmin);

router.get("/edit-product/:productID",isAuth ,adminProductCrontoller.getEditAdmin);

router.post("/edit-product/", isAuth, adminProductCrontoller.postEditAdmin);

router.post("/delete-product/", isAuth, adminProductCrontoller.postDeleteAdmin);

module.exports = router;
