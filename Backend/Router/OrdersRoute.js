import express from "express";
import { AddOrder } from "../Controller/OrderController.js";

const router = express();

router.route('/add-order').post(AddOrder);

export default router;