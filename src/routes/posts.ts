import { Request, Response } from "express";
const express = require('express')
const router = express.Router()
import Post from '../models/Post';


// console.log("POST", Post.find())

// Getting all posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err: any ) {
        res.status(400).json({ message: err.message })
    }
})

// Getting one post
router.get('/:id', (req: Request, res: Response) => {
    res.send(req.params.id)
})

// Create post
router.post('/', async (req: Request, res: Response) => {
   
    const post = new Post({
        title: req.body.title,
        author: req.body.author, 
        content: req.body.content,
        tags: req.body.tags,
    });

    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
        console.log("fas")
    } catch (err: any) {
        res.status(500).json({ message: err.message })
        console.log("jgf")
    }
})

// Edit post 

// PATCH update only information passed by user
// PUT update all the information
router.patch('/:id', (req: Request, res: Response) => {  

})

// Delete post

router.delete('/:id', (req: Request, res: Response) => {  

})


const getPost = async (req: Request, res: Response, next: Function): Promise<void> => {

}
module.exports = router