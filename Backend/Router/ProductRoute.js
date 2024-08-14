const express = require("express");
const ProductController = require("../Controller/ProductController");

const router = express.Router();

router.route('/add-product').post(ProductController.AddProduct);

module.exports = router;;