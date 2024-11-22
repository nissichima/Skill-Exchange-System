import mongoose from 'mongoose';

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://justinmunger:GM1ycSIKf9Z4mMOM@cluster0.tsw1r.mongodb.net/Skill-Exchange-System?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
}

export default connectToDB;