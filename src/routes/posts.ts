import express, { Request, Response } from "express";
const router = express.Router()
import Post from '../models/Post';

// npx ts-node-dev src/app.ts
// console.log("POST", Post.find())

const getPost = async (req: any, res: any, next: Function): Promise<void> => {
    let post
    try {
        const post_id = req.params.id
        post = await Post.findById(post_id)
        if (post == null) {
            return res.status(404).json({ message: "Cannot find post" })
        }
    } catch (err: any) {
        return res.status(500).json({ message: err.message })
    }  
    res.post = post
    next()
}

// Getting all posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const posts = await Post.find()
        // let last_post = posts[posts.length - 1]
        res.json(posts)
    } catch (err: any ) {
        res.status(400).json({ message: err.message })
    }

    // const tagsQuery = req.query.tags as string

    // if (tagsQuery.length < 0 ) {
    //     res.status(400).send("No tags provided.")
    // }
    // const separatedTags = tagsQuery.toLowerCase().split(',')
    // // console.log(separatedTags)

    // res.send(separatedTags)
})

// Getting one post
router.get('/:id', getPost, (req: any, res: any) => {
    res.send(res.post)
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
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
})

// Edit post 

// PATCH update only information passed by user
// PUT update all the information
router.patch('/:id', getPost, async (req: Request, res: any) => {  
    if (req.body.author != null) {
        res.post.author = req.body.author
    }
    if (req.body.title != null) {
        res.post.title = req.body.title
    }
    if (req.body.content != null) {
        res.post.content = req.body.content
    }
    if (req.body.tags != null) {
        res.post.tags = req.body.tags
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (err: any) {
        res.status(400).json({ message: err.message})
    }
})

// Delete post
router.delete('/:id', getPost, async (req: Request, res: any) => {  
    try {
        await res.post.deleteOne()
        res.json({ message: 'Deleted post'})
    } catch (err: any) {
        res.status(500).json({ message: err.message})
    }

})



module.exports = router
