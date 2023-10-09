import User from '../models/user.js';
import Post from '../models/posts.js';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commenter:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: {
        type: String,
        required: true,
        maxlength: 2500
    },
    commentTo: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;