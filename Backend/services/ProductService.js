import productsModel from "../Model/ProductsModel.js";
import { findByIdAndDeleteProduct, findByIdAndUpdatee, getAllProducts } from "../db/dbQueries.js";

export const addProduct = (req, res) => {
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
    let productId = req.params.id;
    productId = productId.replace(/^:/, '');
    const deletedProduct = await findByIdAndDeleteProduct(productId); 
    console.log(productId, deletedProduct);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
}