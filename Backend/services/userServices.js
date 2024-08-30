import { findUserByEmail, findUserById } from "../db/dbQueries.js";
import bcrypt from "bcrypt";
import CreateToken from "../utils/CreateToken.js";
import usersModel from "../Model/UsersModel.js";

export const createUser = async (req) => {
  const { id, name, email, password, address, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userModel = usersModel.create({
    id,
    name,
    email,
    password: hashedPassword,
    address,
    role,
  });
  return userModel;
};

export const LoginUser = async (req) => {
  const { email, password } = req.body;
  const query = { email };
  const existingUser = await findUserByEmail(query);
  if (!existingUser) {
    throw new Error(`User ${email} does not exist");`);
  }
  if (!(await bcrypt.compare(password, existingUser.password))) {
    throw new Error("Incorrect password");
  }
  return await CreateToken(existingUser);
};

export const getUserProfile = async (req) => {
  let userId = req.params.id;
  userId = userId.replace(/^:/, "");
  const query = userId
  const userData = await findUserById(query);
  if (!userData) {
    throw new Error("User not found");
  }
  return userData;
};
