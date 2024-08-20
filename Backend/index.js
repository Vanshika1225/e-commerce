import express from "express";
import userRouter from "./Router/userRouter.js";
import bodyParser from "body-parser";
import { GetUserProfile } from "./Controller/RegisterUser.js";
import ProductRoute from './Router/ProductRoute.js';
import OrderRoute from './Router/OrdersRoute.js';
import  "./db/db.js";
const port = 4000;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", userRouter);
app.get("/api/users/:id", GetUserProfile);

app.use("/api/products",ProductRoute);

app.use("/api/orders",OrderRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});