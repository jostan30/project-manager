const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        //Check if email exists 
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            res.status(400).json({
                success: false,
                msg: "User already Exists"
            });
        }
        if (password.length < 6) {
            res.status(400).json({
                success: false,
                msg: "Password must be at least 6 characters long",
            });
        }
        //create a new user
        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: password,
        })
        res.status(201).json({
            success: true,
            user: {
                id:user._id ,
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password,
            },
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Side Error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user 
        const userExists = await User.findOne({ email: email }).select('+password');
        if (!userExists) {
            res.status(400).json({
                success: false,
                msg: "User doesn't Exist"
            })
        }

        //match password 
        const isMatch = await userExists.matchPassword(password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                msg: "Invalid Credentials"
            });
        }
        const token = generateToken(userExists.id);

        res.status(200).json({
            success: true,
            token: token,
            user: {
                id: userExists._id,
                name: userExists.name,
                phone: userExists.phone,
                email: userExists.email,
            },
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Side Error" })
    }
};


const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: "Server Side Error",
        })

    }
}



module.exports = {
    login,
    register,
    getMe
}