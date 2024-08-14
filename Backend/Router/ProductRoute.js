const express = require("express");
const ProductController = require("../Controller/ProductController");

const router = express.Router();

router.route('/add-product').post(ProductController.AddProduct);
router.route('/product-list').get(ProductController.ShowAllProduct);
router.route('/edit-product/:id').put(ProductController.EditProduct)

module.exports = router;;