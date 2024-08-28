import cartModel from "../Model/CartModel.js";
import orderModel from "../Model/OrdersModel.js";
import productsModel from "../Model/ProductsModel.js";
import usersModel from "../Model/UsersModel.js";

// user
export const findExistingUserByEmail = async (email) => {
  return await usersModel.findOne({ email });
};

export const findUserById = async (userId) => {
  return await usersModel.findById(userId);
};

// product
export const getAllProducts = async () => {
  return await productsModel.find({});
};

export const findProductByIdAndUpdatee = async (id, updatedData) => {
  return await productsModel.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

export const findByIdAndDeleteProduct = async (productId) => {
  return await productsModel.findByIdAndDelete(productId);
};

export const findProductById = async (productId) => {
  return await productsModel.findById(productId);
};

// cart
export const findUserIdInCart = async (userId) => {
  return await cartModel.findOne({ userId });
};

export const fetchCartData = async () => {
  return await cartModel.find({});
};

// order
export const showOrderData = async () => {
  return await orderModel.find({});
};

export const deleteProductById = async (id) => {
  return await orderModel.findByIdAndDelete(id);
};
