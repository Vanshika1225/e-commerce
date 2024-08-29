import express from "express";
const CartRouter = express.Router();
import VerifyToken from "../utils/VerifyToken.js";
import {
  CreateCart,
  getCartData,
  removeCartItem,
  updateCartQuantity,
} from "../services/CartService.js";

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

CartRouter.get("/mshow-cart", VerifyToken, async (req, res) => {
  try{
    const getData = await getCartData(req);;
    res.status(200).json({
      success:true,
      message:"Cart Data fetched successfully!",
      getData
    })

  }catch(error){
    console.log(error);
    res.status(401).json({
      success:false,
      message:"something went wrong !",
      error:error.message
    })
  }
});

CartRouter.put("/update-cart", VerifyToken, async (req, res) => {
  try {
    const updatedData = await updateCartQuantity(req);
    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully!",
      updatedData,
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
