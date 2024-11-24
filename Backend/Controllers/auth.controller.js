import User from '../Schemas/User.js'
import bcryptjs from "bcryptjs"

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

        //encrypting the signup password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            gender
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
        });


    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const login = async(req, res) =>{
    try {
        const {username, password} = req.body;
    } catch (error) {
        
    }
}

export const logout = async(req, res) =>{
    try {
    } catch (error) {
    }
}

