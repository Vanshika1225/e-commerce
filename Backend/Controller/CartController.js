import express from "express";
const CartRouter = express.Router();
import VerifyToken from "../utils/VerifyToken.js";
import { CreateCart, removeCartItem } from "../services/CartSerice.js";

CartRouter.post("/create-cart", VerifyToken, async (req, res) => {
  try {
    const cartData = await CreateCart(req);
    res.status(200).json({
      success: true,
      message: "Cart created successfully",
      cartData,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: true,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

CartRouter.delete("/remove-cart", VerifyToken, async (req, res) => {
  try {
    const updatedCart = await removeCartItem(req);
    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
      updatedCart,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: true,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default CartRouter;
