import {mongoose} from "mongoose";

const ordersSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Products',
    required:true
  },
  quantity:{
    type:Number,
    required:true,
    min:1
  },
  paymentStatus:{
    type:String,
    enum:["Pending","Completed"],
    default:"Pending"
  },
  ShippingAddress:{
    type:String,
    required:true
  },
  totalAmount:{
    type:Number,
    required:true
  },
  deliveryStatus:{
    type:String,
    enum:["Pending","Delivered","Cancelled"],
    default:"Pending"
  },
  orderDate:{
    type:Date,
    default:Date.now
  },
});

const orderModel = mongoose.model("orders", ordersSchema);
export default orderModel;
