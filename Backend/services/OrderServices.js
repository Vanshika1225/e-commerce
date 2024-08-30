import orderModel from "../Model/OrdersModel.js";
import {
  deleteProductById,
  findOrderByIdInUpdate,
  findProductById,
  showOrderData,
} from "../db/dbQueries.js";

export const createOrder = async (req) => {
  let { id, productId, paymentOption, ShippingAddress, quantity } = req.body;
  const query = { productId };
  const product = await findProductById(query);
  if (!product) {
    throw new Error("Product not found");
  }

  const totalAmount = product.price * quantity;
  const name = product.name;
  const imgURL = product.imgURL;
  const paymentStatus = paymentOption === "COD" ? "Pending" : "Completed";

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

export const getOrderData = async () => {
  const orderData = await showOrderData();
  return orderData;
};

export const updateData = async (req) => {
  let { id } = req.params;
  let { paymentOption, ShippingAddress, deliveryStatus } = req.body;
  id = id.replace(/^:/, "");

  const query = {id}
  const order = await findOrderByIdInUpdate(query);

  if (!order) {
    throw new Error("order not found");
  }
  let paymentStatus = order.paymentStatus;

  if (paymentStatus === "COD") {
    paymentStatus =
      order.deliveryStatus === "Delivered" ? "Completed" : "Pending";
    deliveryStatus = deliveryStatus || "Pending";
  } else {
    (paymentStatus = "Completed"), (deliveryStatus = deliveryStatus || "Pending");
  }

  const updatedData = {
    paymentStatus,
    paymentOption,
    ShippingAddress,
    deliveryStatus,
  };
  const updatedProduct = await order.updateOne(updatedData);
  if (!updatedProduct) {
    throw new Error("Product not updated"); 
  }
  return updatedProduct;
};

export const deleteOrder = async (req) => {
  let { id } = req.params;
  id = id.replace(/^:/, "");

  const query = {id}
  const deletedOrder = await deleteProductById(query);
  if (!deletedOrder) {
    throw new Error("Order not found");
  }
  return deletedOrder;
};
