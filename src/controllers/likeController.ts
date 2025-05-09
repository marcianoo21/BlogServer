import Post from "../models/Post";

export const likePost = async (req: any, res: any) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.status(404).json({ message: "No post found" })
        }

        if (post.likes?.includes(req.user.userId)) {
            return res.status(400).json({ message: "You already liked this post" });
        }

        post.likes?.push(req.user.userId);
        await post.save();

        res.status(200).json({ message: "Post liked successfully", likes: post.likes?.length });

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}


export const unlikePost = async (req: any, res: any) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const index = post.likes?.indexOf(req.user.userId) || -1;
        if (index === -1) {
            return res.status(400).json({ message: "You have not liked this post" });
        }

        post.likes?.splice(index, 1); 
        await post.save();

        res.status(200).json({ message: "Post unliked successfully", likes: post.likes?.length });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};