import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    friends : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bio : { type: String }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
