import express from "express";
const router = express.Router();
import VerifyToken from "../utils/VerifyToken.js";
import {
  CreateCart,
  getCartData,
  removeCartItem,
  updateCartQuantity,
} from "../services/CartService.js";
import Success from "../utils/Success.js";
import ErrorMessage from "../utils/ErrorMessage.js";

router.use(VerifyToken);

router.post("/create-cart", async (req, res) => {
  try {
    const cartData = await CreateCart(req);
    Success(res, 200, cartData);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.get("/show-cart", async (req, res) => {
  try {
    const getData = await getCartData(req);
    Success(res, 200, getData);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.put("/update-cart", async (req, res) => {
  try {
    const updatedData = await updateCartQuantity(req);
    Success(res, 200, updatedData);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.delete("/remove-cart", async (req, res) => {
  try {
    const updatedCart = await removeCartItem(req);
    Success(res, 200, updatedCart);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

export default router;
