import express from "express";
import { LoginUser, Logout, RegisterUser } from "../Controller/RegisterUser.js";

const router = express.Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/logout").get(Logout);

export default router;