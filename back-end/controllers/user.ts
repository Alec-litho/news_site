import { HydratedDocument } from "mongoose";
import {UserModel} from "../models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'

const register = async(req: express.Request, res:express.Response ) => {
    try {
 
        const {email, fullName, password, avatarUrl} = req.body
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
            avatarUrl,
            friends: 0,
            location: "not mentioned",
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
        if(!user) return res.send(`User you were looking for wasn't found. Maybe you made mistake in email adress field`)
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
    const result = await UserModel.findOne({_id});
    const {...userData} = result;
    res.json({...userData})
    
}

export {
    register,
    login,
    getUser
}