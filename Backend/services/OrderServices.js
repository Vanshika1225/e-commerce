import orderModel from "../Model/OrdersModel.js";
import { deleteProductById, findProductById, showOrderData } from "../db/dbQueries.js";

export const createOrder = async (req, res ) => {
  let { id, productId, paymentStatus,paymentOption, ShippingAddress, quantity } = req.body;

  const product = await findProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const totalAmount = product.price * quantity;
  const name = product.name;
  const imgURL = product.imgURL;

  const order = new orderModel({
    User: id,
    Products: productId,
    quantity,
    paymentStatus,
    paymentOption,
    ShippingAddress,
    totalAmount,
    name,
    imgURL,
  });

  const savedOrder = await order.save();
  return savedOrder;
};

export const getOrderData = async()=>{
  const orderData = await showOrderData();
  return orderData;
}

export const deleteOrder = async (req, res) => {
  let { id } = req.params;
  id = id.replace(/^:/, "");
  console.log(req.params);

  const deletedOrder = await deleteProductById(id);
  console.log(deletedOrder);
  if (!deletedOrder) {
    throw new Error("Order not found");
  }
  return deletedOrder;
};
