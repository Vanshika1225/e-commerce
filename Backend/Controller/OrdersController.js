import express from "express";
import { createOrder, deleteOrder } from "../services/OrderServices.js";

const OrderRouter = express.Router();

OrderRouter.post("/create-order", async (req, res) => {
  try {
    const orders = await createOrder(req);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while creating order",
      error: error.message,
    });
  }
});

OrderRouter.delete("/delete-order/:id",  async (req, res) => {
    try {
      const deletedData = await deleteOrder(req);
      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
        deletedData
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error while deleting order",
        error: error.message,
      });
    }
});

export default OrderRouter;