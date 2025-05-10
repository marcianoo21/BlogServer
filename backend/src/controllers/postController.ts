import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";


export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const getPostById = (req: any, res: any) => {
    res.send(res.post);
};

export const createPost = async (req: any, res: any) => {
    const { title, content, author, image } = req.body;

    if (!req.user || !req.user.username) {
        return res.status(401).json({ message: "Unauthorized: Missing user information" });
    }

    const usernameFromToken = req.user.username;

    if (usernameFromToken !== author) {
        return res.status(403).json({ message: "You are not authorized to create a post for this author" });
    }

    try {
        const user = await User.findOne({ username: author });
        if (!user) {
            return res.status(404).json({ message: "Author not found" });
        }

        const post = new Post({
            title,
            author: user._id,
            content,
            tags: req.body.tags,
            comments: req.body.comments,
            image,
        });

        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const updatePost = async (req: Request, res: any) => {
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }
    if (req.body.content != null) {
        res.post.content = req.body.content;
    }
    if (req.body.tags != null) {
        res.post.tags = req.body.tags;
    }
    if (req.body.comments != null) {
        res.post.comments = req.body.comments;
    }
    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deletePost = async (req: Request, res: any) => {
    try {
        await res.post.deleteOne();
        res.json({ message: "Deleted post" });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getComments = (req: Request, res: any) => {
    res.json({ id: res.post._id, author: res.post.author.username, comments: res.post.comments });
};