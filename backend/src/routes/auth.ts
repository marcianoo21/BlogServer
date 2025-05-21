import express from "express";
import { loginUser, registerUser, listUsers } from "../controllers/authController";

export const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/show', listUsers)