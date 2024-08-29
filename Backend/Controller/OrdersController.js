import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrderData,
  updateData,
} from "../services/OrderServices.js";
import VerifyToken from "../utils/VerifyToken.js";

const OrderRouter = express.Router();

OrderRouter.post("/create-order", VerifyToken, async (req, res) => {
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

OrderRouter.get("/get-orders", VerifyToken, async (req, res) => {
  try {
    const OrderData = await getOrderData();
    res.status(200).json({
      success: true,
      message: "Order data fetched successfully!",
      OrderData,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

OrderRouter.put("/update-order/:id", VerifyToken, async (req, res) => {
  try{
    const updatedData = await updateData(req);
    res.status(200).json({
      success:true,
      message:"Order updated successfully!",
      updatedData
    })
  }catch(error){
    console.log(error);
    res.status(401).json({
      success:false,
      message:"Something went wrong!",
      error:error.message
    })
  }
});

OrderRouter.delete("/delete-order/:id", VerifyToken, async (req, res) => {
  try {
    const deletedData = await deleteOrder(req);
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      deletedData,
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
