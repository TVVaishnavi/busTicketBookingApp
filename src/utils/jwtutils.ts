import jwt from "jsonwebtoken";
import jwtc from "../config/jwtconfig";

interface User {
  _id: string;
  email: string;
  role: string;
}

const generateToken = (user: User): string => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, jwtc.secretKey, { expiresIn: "1h" });
};

export default { generateToken };