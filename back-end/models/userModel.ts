import mongoose, { Schema, Types } from 'mongoose';



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

}, {
    timestamps: true
}) 

export const UserModel = mongoose.model<UserType>('User', UserSchema) 