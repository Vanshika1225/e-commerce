import cartModel from "../Model/CartModel.js";
import orderModel from "../Model/OrdersModel.js";
import productsModel from "../Model/ProductsModel.js";
import usersModel from "../Model/UsersModel.js";

export const findUserByEmail = (query) => {
  return usersModel.findOne(query);
};

export const findUserById = (query) => {
  return usersModel.findById(query);
};

export const getAllProducts = () => {
  return productsModel.find({});
};

export const UpdateProduct = (query,updatedData) => {
  return productsModel.updateOne(query, updatedData, {
    new: true,
    runValidators: true,
  });
};

export const DeleteProductQuery = (query) => {
  return productsModel.deleteOne(query);
};

export const findProductById = (query) => {
  return productsModel.findById(query);
};

export const findUserIdInCart = (query) => {
  const userId = query.userId;
  return cartModel.findOne({ userId });
};

export const fetchCartData = () => {
  return cartModel.find({});
};

export const showOrderData = () => {
  return orderModel.find({});
};

export const deleteProductById = (query) => {
  return orderModel.findByIdAndDelete(query);
};

export const findOrderByIdInUpdate = (query) => {
  return orderModel.findById(query);
};