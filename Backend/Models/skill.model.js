import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
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

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
