// import models
import User from "../models/user.js";
// import jwt module
import jwt from "jsonwebtoken";

// function get All user
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        console.log(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }     
}
 
// function get single user
export const getUserById = async (req, res) => {
    console.log('funct getuserbyid run')
    try {
        const user = await User.findById(req.body.id);
        const token = jwt.sign(
            { user_id: user._id },
            process.env.JWT_KEY,
          );
        console.log('token : ',token);
        res.json({user, token});
    } catch (error) {
        res.status(404).json({message: error.message});
    }

}
 
// function Create user
export const saveUser = async (req, res) => { 
    try {
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
            
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// function get Token
export const getToken = async (req, res, next) => {
    console.log('function getToken run')
    try{
        console.log(User);
        const user = req.user;
        const token = jwt.sign(
            { user_id: user.id},
            process.env.JWT_KEY,
          );
        console.log('token : ',token);
        res.json({user, token});
        next()
    } catch (error) {
        console.log('error getToken')
        res.status(400).json({message: error.message});
    }

}