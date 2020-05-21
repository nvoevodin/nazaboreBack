import mongoose from "mongoose";
export const User = mongoose.model("User",{
    username:String, 
    date:String,
    favorites:[
        {postId: String,
        dateAdded: String}
    ]
}
    )