import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    author: mongoose.Schema.Types.ObjectId;
    content: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    tags: [{ type: String }]

},
    { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
