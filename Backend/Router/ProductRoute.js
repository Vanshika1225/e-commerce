const express = require("express");
const ProductController = require("../Controller/ProductController");

const router = express.Router();

router.route('/add-product').post(ProductController.AddProduct);
router.route('/product-list').get(ProductController.ShowAllProduct);

module.exports = router;;