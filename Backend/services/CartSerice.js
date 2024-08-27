import cartModel from "../Model/CartModel.js";
import { findProductById, findUserIdInCart } from "../db/dbQueries.js";

export const CreateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await findUserIdInCart(userId);

  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product Not Found!");
  }

  const name = product.name;
  const imgURL = product.imgURL;
  const price = product.price;

  if (!cart) {
    cart = new cartModel({
      userId,
      items: [],
      totalAmount: 0,
    });
  }

  const cartIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );

  console.log("cartIndex : ", cartIndex);

  if (cartIndex !== -1) {
    cart.items[cartIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity, name, imgURL ,price});
  }
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + product.price * item.quantity,
    0
  );
  return await cart.save();
};
