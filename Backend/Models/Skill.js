import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    skillName:{
        type:String,
        required:true,
    },
    category: {
        type:String,
        required:true,
    },
    offeringUser:{
        type:String,
        required:true,
        unique:true
    },
    details:{
        type:String,
        required:true        
    }    
});

const User = mongoose.model("Skill", userSchema);

export default Skill;