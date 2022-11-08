const express = require('express');

const adminProductCrontoller = require('../controllers/adminProduct')

const router = express.Router();


router.get('/add-product', adminProductCrontoller.getAddProduct);

router.post('/add-product', adminProductCrontoller.postAddProduct);

router.get('/products', adminProductCrontoller.getHomeAdmin);

router.get('/edit-product/:productID', adminProductCrontoller.getEditAdmin);

router.post('/edit-product/', adminProductCrontoller.postEditAdmin);

router.post('/delete-product/', adminProductCrontoller.postDeleteAdmin);



exports.routes = router;

