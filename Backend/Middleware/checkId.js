import jwt from 'jsonwebtoken';
import User from '../Models/user.model.js';

const checkId = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "No token provided"})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error: "Invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        console.log("token: ", token)
        console.log("decoded: ", decoded)
        console.log("user Id: ", decoded.userId)
        if (!user){
            return res.status(404).json({error: "User not found"})
        }

        req.user = user

        next();
    } catch (error) {
        console.log("Error in checkId", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export default checkId;
