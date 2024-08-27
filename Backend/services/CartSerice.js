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
 

export const removeCartItem = async(req,res)=>{
  const {userId, productId} = req.body;
  const cart = await findUserIdInCart(userId);
  if(!cart){
    throw new Error("Cart not found!");
  }
  const cartIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );
  if(cartIndex === -1){
    throw new Error("Product not found in cart!");
  }
  cart.items.splice(cartIndex,1);
  cart.totalAmount=0
  cart.totalAmount = cart.items.reduce((sum,item) => sum+item.quantity * item.price, 0)
  return await cart.save();
}