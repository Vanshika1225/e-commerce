import productsModel from "../Model/ProductsModel.js";
import usersModel from "../Model/UsersModel.js";

export const findExistingUserByEmail = async (email) => {
  return await usersModel.findOne({ email });
};

export const findUserById = async (userId) => {
  return await usersModel.findById(userId);
};

export const getAllProducts = async () => {
  return await productsModel.find({});
};

export const findByIdAndUpdatee = async (id,updatedData) => {
  return await productsModel.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

export const findByIdAndDeleteProduct = async (productId) => {
  return await productsModel.findByIdAndDelete(productId);
};