import orderModel from "../Model/OrdersModel.js";
import {
  deleteProductById,
  findOrderByIdInUpdate,
  findProductById,
  showOrderData,
} from "../db/dbQueries.js";

export const createOrder = async (req) => {
  let { id ,productId, paymentOption, ShippingAddress, quantity } = req.body;
  const query = { _id:productId };
  const product = await findProductById(query);
  console.log(product)
  if (!product) {
    throw new Error("Product not found");
  }
  const totalAmount = product.price * quantity;
  const name = product.name;
  const imgURL = product.imgURL;
  const paymentStatus = paymentOption === "COD" ? "Pending" : "Completed";

  return  orderModel.create({
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
};

export const getOrderData = async () => {
  return await showOrderData();
};

export const updateData = async (req) => {
  let { id } = req.params;
  let { paymentOption, ShippingAddress, deliveryStatus } = req.body;
  id = id.replace(/^:/, "");

  const query = {_id:id}
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
    (paymentStatus = "Completed"),
     (deliveryStatus = deliveryStatus || "Pending");
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
  const query = {_id:id}
  const deletedOrder = await deleteProductById(query);
  if (!deletedOrder) {
    throw new Error("Order not found");
  }
  return deletedOrder;
};