import express from "express";
import { createOrder } from "../services/OrderServices.js";

const OrderRouter = express.Router();

OrderRouter.post("/create-order", async(req, res) => {
    try{
        const orders = await createOrder(req)
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            orders
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error while creating order",
            error: error.message
        });
    }
});

export default OrderRouter;