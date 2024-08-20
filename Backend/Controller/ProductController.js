import jwt from "jsonwebtoken";
import productsModel from "../Model/ProductsModel.js";
import { secretKey } from "../AuthToken/AuthToken.js";

export const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  try {
    const decoded_token = jwt.verify(token, secretKey);
    if (decoded_token.role !== "admin") {
      res.status(401).json({
        success: false,
        message: "Unable to decode the token",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Token verification failed",
      error: error.message,
    });
  }
};

export const AddProduct = [
  isAdmin,
  (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        imgURL,
        stockQuantity,
        ratings,
      } = req.body;

      const newProduct = new productsModel({
        id: Math.floor(Math.random() * 1000000),
        name: name,
        description: description,
        price: price,
        category: category,
        imgURL: imgURL,
        stockQuantity: stockQuantity,
        ratings: ratings,
      });

      newProduct
        .save()
        .then((product) => {
          res.status(200).json({
            success: true,
            message: "Product added successfully",
            product: product,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Error while adding product",
            error: err,
          });
        });
    } catch (err) {
      console.error("Token Verification Error:", err);
      res.status(500).json({
        success: false,
        message: "Token verification failed",
        error: err.message,
      });
    }
  },
];

export const ShowAllProduct = async (req, res) => {
  console.log("product list");
  try {
    const product = await productsModel.find({});
    console.log(product);
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching products",
      error: error.message,
    });
  }
};

export const EditProduct = [
  isAdmin,
  async (req, res) => {
    try {
      let productId = req.params.id;
      productId = productId.replace(/^:+/, "");
      const updatedData = req.body;
      console.log(productId, updatedData);
      const product = await productsModel.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true, runValidators: true }
      );
      console.log(product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: product,
      });
    } catch (error) {
      console.error("Token Verification Error:", error);
      res.status(500).json({
        success: false,
        message: "Token verification failed",
        error: error.message,
      });
    }
  },
];

export const DeleteProduct = [
  isAdmin,
  async (req, res) => {
    try {
      let productId = req.params.id;
      productId = productId.replace(/^:+/, "");
      const deletedProduct = await productsModel.findByIdAndDelete(productId);
      console.log(productId, deletedProduct);
      if (!deletedProduct) {
        return res.status(401).json({
          success: false,
          message: "Product Not Exists",
        });
      }
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
  },
];
