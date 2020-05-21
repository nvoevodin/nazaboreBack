import mongoose from "mongoose";
export const Word = mongoose.model("Word",{word:String, description:String, example: String, signature:String, date:String, uid: String})