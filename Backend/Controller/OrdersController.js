import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrderData,
  updateData,
} from "../services/OrderServices.js";
import VerifyToken from "../utils/VerifyToken.js";
import Success from "../utils/Success.js";
import ErrorMessage from "../utils/ErrorMessage.js";

const router = express.Router();

router.use(VerifyToken);

router.post("/create-order", async (req, res) => {
  try {
    const orders = await createOrder(req);
    Success(res, 200, orders);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.get("/get-orders", async (req, res) => {
  try {
    const OrderData = await getOrderData();
    Success(res, 200, OrderData);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.put("/update-order/:id", async (req, res) => {
  try {
    const updatedData = await updateData(req);
    Success(res, 200, updatedData);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.delete("/delete-order/:id", async (req, res) => {
  try {
    const deletedData = await deleteOrder(req);
    Success(res, 200, deletedData);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

export default router;
