import express from "express";
import Success from '../utils/Success.js'
import {
  createUser,
  getUserProfile,
  LoginUser,
} from "../services/userServices.js";
import ErrorMessage from "../utils/ErrorMessage.js";

const router = express.Router();

router.post("/register",async (req, res) => {
  try {
    const data =await createUser(req);
    Success(res, 200, data)
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.post("/login", async (req, res) => {
  try {
    const token  = await LoginUser(req);
    Success(res, 200, token);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserProfile(req);
    console.log("user",user)
    Success(res, 200, user);
  } catch (error) {
    ErrorMessage(res, error.message, 401);
  }
});

export default router;
