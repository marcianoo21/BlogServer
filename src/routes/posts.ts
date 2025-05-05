import express, { Request, Response } from "express";
const router = express.Router()
import Post from '../models/Post';
import User from '../models/User';

// npx ts-node-dev src/app.ts

const getPost = async (req: any, res: any, next: Function): Promise<void> => {
    let post
    try {
        const post_id = req.params.id
        post = await Post.findById(post_id).populate('author', 'username');
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
router.post('/', async (req: any, res: any) => {
    const { title, content, author } = req.body;

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
        });

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
    if (req.body.comments != null) {
        res.post.comments = req.body.comments
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

// Get comments
router.get('/comments/:id', getPost, (req: Request, res: any) => {
    res.json({ id: res.post._id, author: res.post.author.username ,comments: res.post.comments })
})




module.exports = router
