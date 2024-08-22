import orderModel from "../Model/OrdersModel.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../utils/AuthToken.js";
export const createOrder = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Invalid token");
  }
  const decoded_token = jwt.verify(token, secretKey);
  console.log("decode token : ", decoded_token);
  if (!decoded_token) {
    throw new Error("Token verification failed");
  }
  const { id, ProductsList, totalAmount, orderStatus, orderDate } = req.body;
  console.log(id, ProductsList, totalAmount, orderStatus, orderDate);
  const newOrder = new orderModel({
    id,
    ProductsList,
    totalAmount,
    orderStatus,
    orderDate,
  });
  newOrder.save();
};
