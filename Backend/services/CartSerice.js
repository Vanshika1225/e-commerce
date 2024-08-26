// import express from "express";
// import { CreateCart } from "../Controller/CartController.js";
// const CartRouter = express.Router();

// CartRouter.post("/create-cart", async (req, res) => {
//   try {
//     const cartData = await CreateCart(req);
//     res.status(200).json({
//       success: true,
//       message: "Cart created successfully",
//       cartData,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       success: true,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// });

// export default CartRouter;
