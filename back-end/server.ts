import express from "express";
import {register, login, getUser} from './controllers/user';
import {getSportNews} from "./controllers/getSportNews";
import {getNews} from "./controllers/news";
import mongoose from 'mongoose'
import bodyParser from "body-parser";
import cors from 'cors'
let app = express()
let {MONGO_URI, API_PORT} = process.env
app.use(cors());

mongoose
  .connect('mongodb+srv://opaltaco:eamV2B1PXGjNFX3y@cluster0.iyapupi.mongodb.net/NEWS_SITE?retryWrites=true&w=majority')
  .then(() => console.log('connected'))
  .catch((err) => console.log(err))


//----------------Authtication--------------------------------
app.post('/register', bodyParser.json(), register)
app.post('/login', bodyParser.json(), login)
app.post('/getUser', bodyParser.json(), getUser)
//----------------Authtication--------------------------------

//---------------News-----------------------------------------
app.post("/getNews", bodyParser.json(), getNews)

//---------------News-----------------------------------------
app.get('/getsportnews', getSportNews)



app.listen('3001')