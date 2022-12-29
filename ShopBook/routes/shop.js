const express = require("express");

const productController = require("../controllers/shop");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", productController.getIndex);

router.get("/products", productController.getProducts);

router.get("/products/:productID", productController.getProduct);

router.get("/cart", isAuth, productController.getCart);

router.post("/cart", isAuth, productController.postCart);

router.post("/cart-delete-item", isAuth, productController.postCartDeleteProduct);

router.post("/create-order", isAuth, productController.postOrder);

router.get("/orders", isAuth, productController.getOrders);

router.get("/orders/:orderId", isAuth, productController.getInvoice);

module.exports = router;
