import productsModel from "../Model/ProductsModel.js";
import {
  getAllProducts,
  UpdateProduct,
  DeleteProductQuery,
} from "../db/dbQueries.js";

export const addProduct = (req) => {
  const { name, description, price, category, imgURL, stockQuantity, ratings } = req.body;
  return productsModel.create({
    name,
    description,
    price,
    category,
    imgURL,
    stockQuantity,
    ratings,
  });
};

export const ShowAllProducts = async () => {
  return await getAllProducts();
};

export const EditProduct = async (req) => {
  let { id } = req.params;
  id = id.replace(/^:/, "");
  const updatedData = req.body;
  const query = { _id: id };
  const product = await UpdateProduct(query, updatedData);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const DeleteProduct = async (req) => {
  let productId = req.params.id;
  productId = productId.replace(/^:/, "");
  const query = { _id: productId };
  const deletedProduct = await DeleteProductQuery(query);
  if (!deletedProduct.deletedCount) {
    throw new Error("Product not eXIST");
  }
  return deletedProduct;
};
