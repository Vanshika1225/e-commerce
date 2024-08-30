import productsModel from "../Model/ProductsModel.js";
import {
  findProductByIdAndDelete,
  findProductByIdAndUpdate,
  getAllProducts,
} from "../db/dbQueries.js";

export const addProduct = (req) => {
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

export const ShowAllProducts = async () => {
  const products = await getAllProducts();
  return products;
};

export const EditProduct = async (req) => {
  let { id } = req.params;
  id = id.replace(/^:/, "");
  const updatedData = req.body;
  const query = { id, updatedData };
  const product = await findProductByIdAndUpdate(query);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const DeleteProduct = async (req) => {
  let productId = req.params.id;
  productId = productId.replace(/^:/, "");
  const query = { productId };
  const deletedProduct = await findProductByIdAndDelete(query);
  if (!deletedProduct) {
    throw new Error("Product not found");
  }
};
