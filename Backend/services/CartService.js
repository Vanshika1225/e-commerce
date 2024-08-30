import cartModel from "../Model/CartModel.js";
import { fetchCartData, findUserIdInCart } from "../db/dbQueries.js";

export const CreateCart = async (req) => {
  const { userId, productId, quantity } = req.body;
  const query = { userId };
  let cart = await findUserIdInCart(query);

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

  if (cartIndex !== -1) {
    cart.items[cartIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity, name, imgURL, price });
  }
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + product.price * item.quantity,
    0
  );
  return await cart.save();
};

export const getCartData = async () => {
  const cartData = await fetchCartData();
  return cartData;
};

export const updateCartQuantity = async (req) => {
  const { userId, productId } = req.body;
  const query = { userId };
  const cart = await findUserIdInCart(query);
  if (!cart) throw new Error("User Not Found!");

  const cartIndex = await cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );
  if (cartIndex === -1) {
    throw new Error("Product Not Fou7nd!");
  }
  cart.items[cartIndex].quantity = req.body.quantity;
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return cart.save();
};

export const removeCartItem = async (req) => {
  const { userId, productId } = req.body;
  const query = { userId };
  const cart = await findUserIdInCart(query);
  console.log("cart : ", cart);
  if (!cart) {
    throw new Error("User not found!");
  }
  const cartIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );
  if (cartIndex === -1) {
    throw new Error("Product not found in cart!");
  }
  cart.items.splice(cartIndex, 1);
  cart.totalAmount = 0;
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  return await cart.save();
};
