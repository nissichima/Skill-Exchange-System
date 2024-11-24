import generateToken from '../../GenerateToken.js';
import User from '../Schemas/User.js'
import bcrypt from "bcryptjs"

export const signup = async(req, res) =>{
    try {
        const {firstName, lastName, username, password, confirmPassword, gender} = req.body;
        
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"});
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            gender
        });

        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            
            res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                username: newUser.username,
            });
        
        }else{
            res.status(400).json({error:"Invalid user data"})
        }
        
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const login = async(req, res) =>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const passwordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !passwordCorrect){
            return res.status(400).json({error:"The username or password is incorrect"})
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username
        })

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const logout = async(req, res) =>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message:"Logged out"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

