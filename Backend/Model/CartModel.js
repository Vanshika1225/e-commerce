import { mongoose } from "mongoose";
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  name: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
    message: "Invalid URL",
  },
  price:{
    type: Number,
    required: true,
  }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
