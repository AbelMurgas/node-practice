const express = require('express');

const productController = require('../controllers/shop')

const router = express.Router();

router.get('/', productController.getIndex);

router.get('/products', productController.getProducts)

router.get('/products/:productID', productController.getProduct)

exports.routes = router;
