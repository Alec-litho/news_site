import { HydratedDocument } from "mongoose";
import {UserModel} from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'

const register = async(req: express.Request, res:express.Response ) => {
    try {
 
        const {email, fullName, password} = req.body
        if(!(email && password && fullName)) {
            res.json({resp: 'not all fields were filled'})
        }
        const alreadyExists:UserType | null = await UserModel.findOne({email})
        if(alreadyExists) return res.status(400).send('User already exists')
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt);
        const doc: HydratedDocument<UserType> = new UserModel({
            email: email.toLowerCase(),
            fullName,
            password: password,
            avatarUrl: "https://i.ibb.co/Bqm8N2r/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg",
            friends: 0,
            location: "not mentioned",
            description: "...",
            backgroundImg: "https://i.ibb.co/wrvWWtb/depositphotos-121012076-stock-illustration-blank-photo-icon.webp",
            age: 'not mentioned'
        })
        const user = doc.save()
        const token = jwt.sign(
            {user_id: doc._id, email},
            process.env.TOKEN_KEY,
        )
        res.status(200).json({token})
    } catch (error) {
        res.send(error)
         
    }
}

const login = async(req: express.Request, res:express.Response ) => {
    try { 
        const {password, email} = req.body;
        let user:UserType|null = await UserModel.findOne({email})
        if(!user || user.googleId) return res.send(`User you were looking for wasn't found. Maybe you made mistake in email adress field`)
        const isValidPass = bcrypt.compare(password, user.password)
        if(!isValidPass) {
            return res.status(404).json({
                message: "login or password is not correct"
            })
        }
        const token = jwt.sign({
            _id: user._id
        }, 'secret', {
            expiresIn: '30d'
        });
        const {...userData} = user;
        console.log({...userData});
        
        res.json({
            ...userData,
            token
        })
    } catch (error) {
        res.send("error occured in try/cathc block - "+error)
    }
  
}

const getUser = async(req: express.Request, res:express.Response ) => {
    const _id = req.body._id;
    console.log("_id ---------", req.body);
    
    if(_id === "null" || _id == undefined) res.json({message: "_id is null", value: null})
    else {
        const result = await UserModel.findById({_id});
        console.log("result ----------->   ",result);
        result===null? res.json({message: "user wasn't found", value:null}) : res.json(result);
    }   
}

export {
    register,
    login,
    getUser
}