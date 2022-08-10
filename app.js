// import express
import express from "express";
// import mongoose
import mongoose from "mongoose";
// import routes
import route from "./routes/index.js";
// import cors
import cors from "cors";
// import passport
import passport from 'passport';
// import session
import session from "express-session";
// import body-parser
import bodyParser from "body-parser";
// import localstrategy
import {localStrategy} from './passport.js';
// import dotenv
import dotenv from "dotenv";

// construct express function
const app = express();
dotenv.config();

// configuration database mongoDB
mongoose.connect("mongodb://localhost:27017/eoapp",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));

// middleware 
app.use(cors());
app.use(express.json());

// localstrategy 
localStrategy(passport);
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',route);
 
// listening to port
app.listen('3000',()=> console.log('Server Running at port: 3000'));