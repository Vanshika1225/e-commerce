import { findExistingUserByEmail, findUserById } from "../db/dbQueries.js";
import usersModel from "../Model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import {secretKey} from '../utils/AuthToken.js'

export const createUser = async (req, res) => {
  const { id, name, email, password, address, role } = req.body;
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
};

export const LoginUser = async (req,res) => {
  const { email, password } = req.body;
  const existingUser = await findExistingUserByEmail(email);
  if (!existingUser) {
    throw new Error(`User ${email} does not exist");`);
  }

  if (!(await bcrypt.compare(password, existingUser.password))) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    { userId: existingUser._id, role: existingUser.role },
    secretKey,
    {
      expiresIn: "24h",
    }
  );

  return { token };
};

export const getUserProfile = async (req, res) => {
  let userId = req.params.id;
  userId = userId.replace(/^:/, '');
  const userData = await findUserById(userId);
  if (!userData) {
    throw new Error("User not found");
  }
  return userData ;
}