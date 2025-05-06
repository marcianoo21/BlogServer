import Post from "../models/Post";

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
    next();
}

export default getPost;
