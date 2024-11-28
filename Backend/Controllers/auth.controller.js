import generateToken from '../GenerateToken.js';
import User from '../Models/user.model.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { sgMail, fromEmail } from '../DB/mailer.js';

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
            
            res.status(201).json({message:"Successfully created", newUser})
        
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

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Generate a reset token (valid for 1 hour)
      const resetToken = jwt.sign({ id: user._id }, "168e2bad30a3957a9761be7313c2e4496142cfee0f71302e80e114b8ca5cef4e", { expiresIn: "1h" });
  
      // Save the reset token and expiration to the user document
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
      await user.save();
  
      // Send email with reset link
      const resetLink = `http://localhost:5001/password-reset/${resetToken}`;
      const msg = {
        to: user.email,
        from: fromEmail,
        subject: "Password Reset Request",
        text: `Click the link to reset your password: ${resetLink}`,
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      };
  
      await sgMail.send(msg);
  
      res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
      console.log("Error in requestPasswordReset:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      // Verify the reset token
      const decoded = jwt.verify(token, "secret_key"); // Use your secret key here
      const user = await User.findOne({
        _id: decoded.id,
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ error: "Invalid or expired reset token" });
      }
      
      user.password = newPassword;  
      user.resetToken = undefined; // Clear the reset token
      user.resetTokenExpiration = undefined; // Clear expiration
      await user.save();
  
      res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
      console.log("Error in resetPassword:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  