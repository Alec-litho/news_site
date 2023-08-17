import express from "express";
import {register, login, getUser} from './controllers/user';
import {getSportNews} from "./controllers/getSportNews";
import {getNews} from "./controllers/news";
import mongoose from 'mongoose'
import bodyParser from "body-parser";
import cors from 'cors'
import {checkAuth} from './utils/checkAuth'
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {UserModel} from "./models/userModel";
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import session from "express-session";
import { log } from "console";

const CLIENT_ID = "1015608676012-0nddm7jredi2ecik5cd98ajqi8pn5jh4.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

let app = express()
let {MONGO_URI, API_PORT} = process.env
app.use(cors());
app.use(cookieParser())
app.use(session({
  secret: 'meow',
  saveUninitialized: true,
}))
app.use(passport.authenticate('session'));
mongoose
  .connect('mongodb+srv://opaltaco:eamV2B1PXGjNFX3y@cluster0.iyapupi.mongodb.net/NEWS_SITE?retryWrites=true&w=majority')
  .then(() => console.log('connected'))
  .catch((err) => console.log(err))

//----------------Authentication--------------------------------
app.post('/register', bodyParser.json(), register)
app.post('/login', bodyParser.json(), login)
app.post('/getUser', bodyParser.json(),/* checkAuth,*/ getUser)
//----------------Authentication--------------------------------

//----------------Google OAuth-------------------------------//
app.use(express.static("public"))
passport.serializeUser((user,done) => {
  console.log("serialize user");
  
  done(null, user);
});
passport.deserializeUser((user: Express.User, done) => {
  UserModel.findById(user._doc._id).then((res) => {
    console.log("deserializeUser --- ",res);
    if(res === undefined) done("error", user)
    else done(null, user)
  })
});


passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:3001/callback/url",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
(accessToken, refreshToken, profile, done) => {
  UserModel.findOne({googleId: profile.id})
    .then(async(data) => {
      console.log("data ---->", data);
      
      if(!data) {
        let user = new UserModel({
          googleId: profile.id,
          fullName: profile._json.name,
          email: profile._json.email,
          password: "null",
          location: "not mentioned",
          age: "not mentioned",
          friends: 0,
          avatarUrl: profile._json.picture
        });
        await user.save();
      }
      let existUser = await UserModel.findOne({googleId: profile.id})
      const token = jwt.sign({
        _id: existUser._id
      }, 'secret', {expiresIn: '30d'});
      done(null, {...existUser, token})
    })
}
))
app.get("/auth", passport.authenticate("google", { scope: ["profile", "email"] }), (req,res) => {
  console.log("auth");
  
});
app.get("/callback/url", passport.authenticate("google",{failureRedirect: "http://localhost:3000/login"}), (req: Request,res:Response) => {
  console.log("callback url");
  
  let {token} = req.user 
  res.cookie("token", token)
  res.cookie("_id", req.user._doc._id.toString())
  res.redirect("http://localhost:3000/home")
})

//---------------News-----------------------------------------
app.post("/getNews", bodyParser.json(), getNews)

//---------------News-----------------------------------------
app.get('/getsportnews', getSportNews)


app.listen('3001', () => {
  console.log('w');
  
})