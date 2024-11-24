import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    organizer:{
        type:String,
        required:true
    },
    participant: {
        type:String,
        required:true
    },
    skill:{
        type:String,
        required:true
    },
    dateTime:{
        type:Date,
        required:true        
    },
    duration:{
        type:Int,
        required:true        
    },
    locationType:{
        type:String,
        required:true,
        enum:["Online", "Physical"]        
    }    
});

const User = mongoose.model("Session", userSchema);

export default Session;