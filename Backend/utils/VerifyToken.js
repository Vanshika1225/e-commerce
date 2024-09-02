import jwt from "jsonwebtoken";
import { secretKey } from "./AuthToken.js";

const VerifyToken = (req, res,next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Invalid token");
  }
  const decoded_token = jwt.verify(token, secretKey);
  if (!decoded_token) {
    throw new Error("Unable to decode the token");
  }
  req.userId = decoded_token.userId;
  req.role = decoded_token.role;
  req.email = decoded_token.email;
  next();
};

export default VerifyToken;