import jwt from "jsonwebtoken";
import { secretKey } from "../utils/AuthToken.js";

const CreateToken =  (existingUser) => {
  const token = jwt.sign(
    {
      userId: existingUser._id,
      role: existingUser.role,
      email: existingUser.email,
    },
    secretKey,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export default CreateToken;