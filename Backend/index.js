import express from "express";
import bodyParser from "body-parser";
import  "./db/db.js";
import userRouter from "./Controller/UserController.js";
import productRouter from "./Controller/ProductController.js";
import OrderRouter from "./Controller/OrdersController.js";
const port = 4000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", userRouter);
app.use('/api/products' , productRouter);
app.use('/api/orders', OrderRouter);
// app.use("/api/cart",CartRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});