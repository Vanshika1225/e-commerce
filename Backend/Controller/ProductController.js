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

router.post("/add-product", async (req, res) => {
  try {
    const AddProduct = await addProduct(req);
    console.log(AddProduct);
    Success(res, 200, AddProduct);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.get("/product-list", async (req,res) => {
  try {
    const products = await ShowAllProducts();
    Success(res, 200, products);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.put("/edit-product/:id", async (req, res) => {
  try {
    const product = await EditProduct(req);
    Success(res, 200, product);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  try {
    const deletedProduct = await DeleteProduct(req);
    Success(res, 200, deletedProduct);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

export default router;
