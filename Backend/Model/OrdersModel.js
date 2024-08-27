import {mongoose} from "mongoose";

const ordersSchema = new mongoose.Schema({
  User:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  Products:{
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
  paymentOption:{
    type:String,
    enum:["COD","Online Transfer"],
    default:"COD"
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
  name:{
    type:String,
    required:true
  },
  imgURL:{
    type:String,
    required:true,
    message:"Invalid URL"
  }
});

const orderModel = mongoose.model("orders", ordersSchema);
export default orderModel;
