import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = process.env.SECRET_JWT || "thisisoursecretjsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.loginCookie;
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    next({ error: error.message });
  }
};
