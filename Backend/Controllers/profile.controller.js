import User from '../Models/user.model.js'

export const updateProfile = async(req, res) =>{
    try {
        const userId = req.user.id;         
        const updatedData = req.body; 
    
        const updatedUser = await User.findByIdAndUpdate(
        userId,                
        { $set: updatedData }, 
        { new: true, runValidators: true }
        );
    
        if (updatedUser) {
            res.status(200).json({ message: 'Profile updated successfully', updatedUser });
        } else {
            res.status(400).json({ message: 'Error updating profile'});
        }
    
    } catch (error) {
        console.log("Error in updateProfile controller", error.message)
        res.status(500).json({error: "Internal server error"});
    }
}

