import express from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost, getComments } from "../controllers/postController";
import getPost from "../middleware/getPostMiddleware";
import { checkRole } from "../middleware/roleMiddleware";

export const postRouter = express.Router();

// get all psots
postRouter.get("/", checkRole('admin'), getAllPosts);

// get one post
postRouter.get("/:id", getPost, getPostById);

// new post
postRouter.post("/", createPost);

// update post 
postRouter.patch("/:id", getPost, updatePost);

// delete post
postRouter.delete("/:id", getPost, deletePost);

// get comments
postRouter.get("/comments/:id", getPost, getComments);

