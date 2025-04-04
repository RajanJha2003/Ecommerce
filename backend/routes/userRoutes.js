import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const userRouter=express.Router();


userRouter.route("/register").post(registerUser);

userRouter.route("/login").post(loginUser);

userRouter.post("/logout",protect,logoutUser);




export default userRouter;