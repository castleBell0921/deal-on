const express = require('express');
const productController = require('./productController');
const router = express.Router();

router.get('/allProducts', productController.allProductController);
router.get('/auctionProducts', productController.auctionProductController);
router.get('/normalProducts', productController.normalProductController);
router.get('/allProductsCategory', productController.allProductsCategory);
router.get('/auctionProductsCategory', productController.auctionProductsCategory);
router.get('/normalProductsCategory', productController.normalProductsCategory)
module.exports = router;