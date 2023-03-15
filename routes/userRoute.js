import express from 'express'
import { getUsers, register, getUserId,login, verifyPassword,verifyEmail,updatePassword,logout,getUserWithEmail } from "../controllers/userController.js"
import { admin } from '../middleware/admin.js'
import { auth } from '../middleware/auth.js'
import { userValidator } from '../middleware/userValidator.js'
import upload from "../multer/multer.js";
import validateRequest from '../middleware/validator.js'
const router = express.Router()

router.route("/").get(getUsers);
router.route("/verify/:token").get(verifyEmail)
router.route("/verify/password/:token").get(verifyPassword)
router.route("/register").post(upload.single("file"),userValidator,validateRequest,register);
router.route("/login").post(login);
router.route("/:id").get(auth,validateRequest,getUserId);
router.route("/:email").get(auth,validateRequest,getUserWithEmail);
router.route("/logout").put(auth,logout);

export default router