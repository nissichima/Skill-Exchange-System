import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
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
        type:Number,
        required:true        
    },
    locationType:{
        type:String,
        required:true,
        enum:["Online", "Physical"]        
    }    
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
