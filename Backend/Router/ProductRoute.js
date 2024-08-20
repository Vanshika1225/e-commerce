import express from "express";
import { AddProduct, DeleteProduct, EditProduct, ShowAllProduct } from "../Controller/ProductController.js";

const router = express.Router();

router.route('/add-product').post(AddProduct);
router.route('/product-list').get(ShowAllProduct);
router.route('/edit-product/:id').put(EditProduct);
router.route('/delete-product/:id').delete(DeleteProduct)

export default router;