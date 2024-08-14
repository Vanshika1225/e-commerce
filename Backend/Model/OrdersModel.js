const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.type.object,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const ordersSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  ProductsList: {
    type: [ProductSchema],
    required: true,
    default: [],
    validate: {
      validator: function (products) {
        return products.length > 0;
      },
      message: "Products list should not be empty.",
    },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Delivered", "Canceled"],
    default: "Pending",
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const orderModel = mongoose.model("orders", ordersSchema);
module.exports = orderModel;
