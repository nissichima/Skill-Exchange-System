import generateToken from '../../GenerateToken.js';
import User from '../Models/User.js'
import bcrypt from "bcryptjs"

export const signup = async(req, res) =>{
    try {
        const {firstName, lastName, username, email, password, confirmPassword, gender} = req.body;
        
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"});
        }

        const enteredUsername = await User.findOne({username});
        const enteredEmail = await User.findOne({email});

        if(enteredUsername){
            return res.status(400).json({error:"Username already exists"});
        }
        if(enteredEmail){
            return res.status(400).json({error:"Email already in use"});
        }



        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
            gender
        });

        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            
            res.status(201).json({message:"Successfully created", user})
        
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
        const {loginInput, password} = req.body;

        //User is able to login with both their usernames and emails
        const user = await User.findOne({
            $or:[
            {username: loginInput}, 
            {email: loginInput}
        ]});

        if(!user){
            return res.status(400).json({error:"The username or password is incorrect"})
        }
        
        const passwordCorrect = await bcrypt.compare(password, user?.password || "");

        if(user && passwordCorrect){
            return res.status(200).json({message:"Successfully logged in", user})
            generateToken(user._id, res);
        }else{
            return res.status(400).json({error:"The username or password is incorrect"})
        }
        
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

