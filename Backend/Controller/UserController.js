import {
  createUser,
  getUserProfile,
  LoginUser,
} from "../services/userServices.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  try {
    const registeredUsers = createUser(req);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      registeredUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { token } = await LoginUser(req);
    res.status(201).json({
      success: true,
      message: "User LoggedIn Successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

userRouter.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserProfile(req);
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default userRouter;
