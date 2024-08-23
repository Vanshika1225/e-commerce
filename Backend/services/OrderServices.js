import orderModel from "../Model/OrdersModel.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../utils/AuthToken.js";
import { findProductById } from "../db/dbQueries.js";

export const createOrder = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Invalid token");
  }
  const decoded_token = jwt.verify(token, secretKey);

  if (decoded_token.role !== "admin") {
    throw new Error("Unable to decode the token");
  }

  const { id, productId, paymentStatus, ShippingAddress, quantity } = req.body;

  const product = await findProductById(productId);
  if (!product) {
    throw new Error("Product not found");;
  }

  const totalAmount = product.price * quantity;
  const name = product.name;
  const imgURL = product.imgURL;

  const order = new orderModel({
    User: id,
    Products: productId,
    quantity,
    paymentStatus,
    ShippingAddress,
    totalAmount,
    name,
    imgURL,
  });

  const savedOrder = await order.save();
  return savedOrder;
};
