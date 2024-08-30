import express from "express";
import {
  addProduct,
  DeleteProduct,
  EditProduct,
  ShowAllProducts,
} from "../services/ProductService.js";
import VerifyToken from "../utils/VerifyToken.js";
import Success from "../utils/Success.js";
import ErrorMessage from "../utils/ErrorMessage.js";

const router = express.Router();

router.use(VerifyToken);

router.post("/add-product", (req, res) => {
  try {
    const AddProduct = addProduct(req);
    Success(res, 200, message.success, AddProduct);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.get("/product-list", async (res) => {
  try {
    const products = await ShowAllProducts();
    Success(res, 200, message.success, products);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.put("/edit-product/:id", async (req, res) => {
  try {
    const product = await EditProduct(req);
    Success(res, 200, message.success, product);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  try {
    const deletedProduct = await DeleteProduct(req);
    Success(res, 200, message.success, deletedProduct);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

export default router;
