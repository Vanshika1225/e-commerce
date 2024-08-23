import productsModel from "../Model/ProductsModel.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../utils/AuthToken.js";
import { findByIdAndDeleteProduct, findByIdAndUpdatee, getAllProducts } from "../db/dbQueries.js";

export const addProduct = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Invalid token");
  }
  const decoded_token = jwt.verify(token, secretKey);
  if (decoded_token.role !== "admin") {
    throw new Error("Unable to decode the token");
  }
  const { name, description, price, category, imgURL, stockQuantity, ratings } =
    req.body;
  const newProduct = new productsModel({
    name,
    description,
    price,
    category,
    imgURL,
    stockQuantity,
    ratings,
  });
  newProduct.save();
};

export const ShowAllProducts = async (req, res) => {
  const products = await getAllProducts();
  return products;
};

export const EditProduct = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Invalid token");
  }
  const decoded_token = jwt.verify(token, secretKey);
  console.log("decode token : ", decoded_token)
  if (decoded_token.role !== "admin") {
    throw new Error("Unable to decode the token");
  }
  let { id } = req.params;
  id = id.replace(/^:/, "");
  const updatedData = req.body;
  console.log(id, updatedData);

  const product = await findByIdAndUpdatee(id, updatedData);
  console.log("product is :", product);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const DeleteProduct = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decoded_token = jwt.verify(token, secretKey);
    console.log("decode token : ", decoded_token)
    if (decoded_token.role !== "admin") {
      throw new Error("Unable to decode the token");
    }
    let productId = req.params.id;
    productId = productId.replace(/^:/, '');
    const deletedProduct = await findByIdAndDeleteProduct(productId); 
    console.log(productId, deletedProduct);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
}