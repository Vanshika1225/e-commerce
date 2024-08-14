const express = require("express");
const userRouter = require("./Router/userRouter");
const bodyParser = require("body-parser");
const userController = require("./Controller/RegisterUser");
const ProductRoute = require('./Router/ProductRoute')
const port = 4000;

const app = express();

require("./db/db");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", userRouter);
app.get("/api/users/:id", userController.GetUserProfile);

app.use("/api/products",ProductRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});