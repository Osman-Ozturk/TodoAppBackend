import * as dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authReset = async (req, res, next) => {
  try {
    const token = req.cookies.resetCookie;
    const tokenDecoded = jwt.verify(
      token,
      process.env.SECRET_JWT || "thisisoursecretjsonwebtoken"
    );
    req.user = await User.findById(tokenDecoded._id);
    next();
  } catch (err) {
    next(err);
  }
};
export default authReset;