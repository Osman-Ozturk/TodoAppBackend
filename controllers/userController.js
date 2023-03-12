import User from "../models/User.js";
import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
const SECRET_JWT = process.env.SECRET_JWT || "thisisoursecretjsonwebtoken";
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};
const getUserId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const foundId = await User.findById(id);
    if (foundId) {
      return res.status(201).send(foundId);
    }
    const error = new Error(`kein User mit der Id ${id}`);
    error.statusCode = 422;
    throw error;
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const newUser = req.body;
    const profilePicture = req.file?.path;
    const findUser = await User.findOne({ email: newUser.email });
    if (findUser) {
      const error = new Error("email available");
      error.status = 401;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const createdUser = await User.create({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: hashedPassword,
      profilePicture: profilePicture,
      isOnline: false,
      city: newUser.city,
      category: newUser.category,
    });
    if (!createdUser) {
      const error = new Error("is required");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: createdUser.email,
        _id: createdUser._id,
      },
      SECRET_JWT,
      {
        expiresIn: "1h",
      }
    );
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: createdUser.email, // Change to your recipient
      from: "ztrkosmn09@gmail.com", // Change to your verified sender
      subject: "Email verification",
      text: `Zur Verifizierung der email bitte zu folgender email gehen:http://localhost:${process.env.PORT}/users/verify/${token} `,
      html: `<p><a href="http://localhost:${process.env.PORT}/users/verify/${token}">Verifiziere deine Email</a></p>`,
    };
    const response = await sgMail.send(msg);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
};
const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, SECRET_JWT);
    const id = decodedToken._id;
    await User.findByIdAndUpdate(id, {
      isVerified: true,
    });
    res.redirect("http://localhost:3000/");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const verifyPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, SECRET_JWT);
    const id = decodedToken._id;
    const user = await User.findByIdAndUpdate(id, {
      isVerified: true,
    });
    res.cookie("resetCookie", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: false,
    });
    res.redirect("http://localhost:3000/setPassword");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const login = async (req,res,next)=>{
        try {
                const user = req.body
                const findUser =await User.findOne({email:user.email}) 
                if (!findUser) {
                        const error = new Error("Email or Password Is Incorrect");
                        error.statusCode = 401;
                        throw error;
                      }
                const compare = await bcrypt.compare(user.password,findUser.password)  
                if (!compare) {
                        const error = new Error("Email or Password Is Incorrect");
                        error.statusCode = 401;
                        throw error;
                      }  
                      
                      const token = jwt.sign(
                        {
                          email: findUser.email,
                          userId: findUser._id,
                        },
                        SECRET_JWT,
                        { expiresIn: "1d" }
                      );
                      const einTag = 1000 * 60 * 60 * 24;
                      res
                        .cookie("loginCookie", token, {
                          maxAge: einTag,
                          httpOnly: true,
                        })
                        .send({
                          auth: "loggedIn",
                          fullName: findUser.fullName,
                          firstName: findUser.firstName,
                          lastName: findUser.lastName,
                          profilePicture: findUser.profilePicture,
                          email: findUser.email,
                          _id: findUser._id,
                          token: token,
                          maxAge: einTag,
                          httpOnly: true,
                          isAdmin: findUser.isAdmin,
                          city: findUser.city,
                          mobile: findUser.mobile,
                          bio: findUser.bio,
                        });      
        } catch (error) {
                next(error)
        }

}
export { getUsers, addUser, getUserId, deleteTodo };
