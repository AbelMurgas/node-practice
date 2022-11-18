const express = require("express");

const productController = require("../controllers/shop");

const router = express.Router();

router.get("/", productController.getIndex);

router.get("/products", productController.getProducts);

router.get("/products/:productID", productController.getProduct);

router.get("/cart", productController.getCart);

router.post("/cart", productController.postCart);

router.post("/cart-delete-item", productController.postCartDeleteProduct);
exports.routes = router;
