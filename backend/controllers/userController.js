import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";


const registerUser=async(req,res)=>{
   try {
    const {name,email,password}=req.body;
    const userExists=await User.findOne({email});

    if(userExists){
        res.status(400).json({message:"User already exists"});
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=new User({
        name,
        email,
        password:hashedPassword
    });

    await user.save();

    generateToken(req, res, user._id);

    res.status(201).json({
        message: 'Registration successful. Welcome!',
        userId: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      });
   } catch (error) {
    res.status(500).json({message:error.message});
    
   }


}


const loginUser=async(req,res)=>{
   try {
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        res.status(400).json({message:"User does not exist"});
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.status(400).json({message:"Invalid credentials"});
    }

    generateToken(req, res, user._id);

    res.status(200).json({
      message: 'Login successful.',
      userId: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
   } catch (error) {
    res.status(500).json({message:error.message});
    
   }


}

export {registerUser,loginUser};