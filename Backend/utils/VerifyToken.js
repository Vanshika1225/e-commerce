import jwt from "jsonwebtoken";
import { secretKey } from "./AuthToken.js";

const VerifyToken = (req, next) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new Error("Invalid token");
  }
  const decoded_token = jwt.verify(token, secretKey);
  if (!decoded_token) {
    throw new Error("Unable to decode the token");
  }
  req.userId = decoded.userId;
  req.role = decoded.role;
  req.email = decoded.email;
  next();
};

export default VerifyToken;