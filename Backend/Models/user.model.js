import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required: true,
        enum:["male", "female"]
    },
    seekedSkills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
    }],
    offeredSkills:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
    }],
    resetToken: { type: String }, // Token for password reset
    resetTokenExpiration: { type: Date }, // Token expiry time
},
{timestamps:true});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;