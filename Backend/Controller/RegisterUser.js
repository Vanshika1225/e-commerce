import usersModel from "../Model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../AuthToken/AuthToken.js";

export const RegisterUser = async (request, response) => {
  try {
    const { id, name, email, password, address, role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new usersModel({
      id,
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });
    await userModel.save();
    response.status(201).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const existingUser = await usersModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(existingUser); 
    console.log(
      bcrypt.compare(await password, existingUser.password),
      password,
      existingUser.password
    );

    if (!(await bcrypt.compare(password, existingUser.password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, secretKey , {
      expiresIn: "1h",
    });

    res.cookie("token", token);
    res.json({
      success: true,
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
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", req.params.token);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const GetUserProfile = async (req, res) => {
  try {
    let userId = req.params.id.trim();
    userId = userId.replace(/^:+/, "");
    const userProfile = await usersModel.findById(userId);
    if (!userProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      userProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
