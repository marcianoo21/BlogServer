import express from "express";
import { likePost, unlikePost } from '../controllers/likeController';
import middleAuth from '../middleware/authMiddleware';

export const userRouter = express.Router();

userRouter.post('/posts/:id/like', middleAuth, likePost);
userRouter.post('/posts/:id/unlike', middleAuth, unlikePost);