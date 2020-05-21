// import {model, Schema} from 'mongoose'

// const postSchema = new Schema({
//     word:String, 
//     description:String, 
//     example: String, 
//     signature:String, 
//     date:String, 
//     uid: String, 
//     likes: Number,

// })

// module.exports = model('Post',postSchema);


import mongoose from "mongoose";
export const Post = mongoose.model("Post",{
    word:String, 
    description:String, 
    example: String, 
    signature:String, 
    date:String, 
    uid: String,
    likes: Number,
    dislikes: Number,
    category: String}
    )