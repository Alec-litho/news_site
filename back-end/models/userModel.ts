import mongoose, { Schema, Types } from 'mongoose';
import findOrCreate from "mongoose-findorcreate";
 

const UserSchema = new Schema<UserType>({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: String,
    friends: Number,
    age: String,
    avatarUrl: {
        type: String,
        default: "https://i.ibb.co/7YGBqxN/empty-Profile-Picture.webp"
    },
    googleId: String

}, {
    timestamps: true
}) 
UserSchema.plugin(findOrCreate)
export const UserModel = mongoose.model<UserType>('User', UserSchema) 