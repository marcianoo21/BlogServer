import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    author: mongoose.Schema.Types.ObjectId; // string; 
    content: string;
    tags?: string[];
    comments?: string[];
    image?: string;
    likes?: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // type: string
    content: { type: String, required: true },
    tags: [{ type: String }],
    comments: [{ type: String }],
    image: { type: String },
    likes: { type: mongoose.Schema.Types.ObjectId, ref: "User"}
},
    { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
