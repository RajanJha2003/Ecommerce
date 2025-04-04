import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Not authorized"});
        }

        const verify=jwt.verify(token,process.env.JWT_SECRET);

        if(!verify){
            return res.status(401).json({message:"Not authorized"});
        }

        req.user=await User.findById(verify.userId).select("-password");

        next();
    } catch (error) {
        
    }
}


export default protect;