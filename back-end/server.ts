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
import cookieParser from 'cookie-parser'
const CLIENT_ID = "1015608676012-0nddm7jredi2ecik5cd98ajqi8pn5jh4.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

let app = express()
let {MONGO_URI, API_PORT} = process.env
app.use(cors());

mongoose
  .connect('mongodb+srv://opaltaco:eamV2B1PXGjNFX3y@cluster0.iyapupi.mongodb.net/NEWS_SITE?retryWrites=true&w=majority')
  .then(() => console.log('connected'))
  .catch((err) => console.log(err))

  type User = {
    id: string
    username: string
  }

//----------------Google OAuth-------------------------------//
// app.use(express.static("public"))
app.use(cookieParser())
passport.serializeUser((user:User,done) => {
  done(null, user.id);
});
passport.deserializeUser((id:string, done) => {
  UserModel.findById(id, (err,user:UserType) => {
    done(err,user)
  });
});

passport.use(new GoogleStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:3001/callback/url",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
(accessToken, refreshToken, profile, done) => {
  console.log(profile);
  UserModel.findOne({googleId: profile.id})
    .then((data) => {
      if(!data) {
        let user = new UserModel({
          googleId: profile.id,
          fullName: profile._json.name
          
        });
        user.save()
        return done();
      } else return done();
    })
  
}
))
app.get("/auth", passport.authenticate("google", { scope: ["profile"] }));
app.get("/callback/url", passport.authenticate("google",{failureRedirect: "http://localhost:3000/login"}), (req,res) => {
  res.redirect("http://localhost:3000/home")
})
//----------------Authtication--------------------------------
app.post('/register', bodyParser.json(), register)
app.post('/login', bodyParser.json(), login)
app.post('/getUser', bodyParser.json(), checkAuth, getUser)
//----------------Authtication--------------------------------

//---------------News-----------------------------------------
app.post("/getNews", bodyParser.json(), getNews)

//---------------News-----------------------------------------
app.get('/getsportnews', getSportNews)


app.listen('3001', () => {
  console.log('w');
  
})