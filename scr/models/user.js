import mongoose from "mongoose";
export const User = mongoose.model("User",{
    username:String, 
    date:String,
    postCount:Number,
    favorites:[
        {postId: String,
        dateAdded: String}
    ],
    posts:[
        {
            postId: String,
            dateAdded: String
        }
    ]
    
}
    )