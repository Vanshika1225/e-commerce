import jwt from 'jsonwebtoken'
import { secretKey } from './AuthToken.js';

const VerifyToken = (req,res,next)=>{
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decoded_token = jwt.verify(token, secretKey);
    console.log("decode token : ", decoded_token);
    if (!decoded_token) {
      throw new Error("Unable to decode the token");
    }
    next()
}

export default VerifyToken;