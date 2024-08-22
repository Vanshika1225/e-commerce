import express from "express";
import {
  addProduct,
  DeleteProduct,
  EditProduct,
  ShowAllProducts,
} from "../services/ProductService.js";

const productRouter = express.Router();

productRouter.post("/add-product",  (req, res) => {
  try {
    const AddProduct = addProduct(req);
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: AddProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: error.message,
    });
  }
});

productRouter.get("/product-list", async (req, res) => {
  try {
    const products = await ShowAllProducts();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
});

productRouter.put("/edit-product/:id", async (req, res) => {
  try {
    const product = await EditProduct(req);
    console.log("product ", product);
    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "token validation error",
      error: error.message,
    });
  }
});

productRouter.delete("/delete-product/:id", async (req, res) => {
  console.log("delete")
  try {
   const deletedProduct = await DeleteProduct(req);
    return res.status(201).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "token validation error",
      error: error.message,
    });
  }
});

export default productRouter;
