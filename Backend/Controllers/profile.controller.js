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

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate("offeredSkills")
            .populate("seekedSkills");

        if (!user){
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            offeredSkills: user.offeredSkills,
            offeredSkills: user.seekedSkills
        })
    } catch (error) {
        res.status(500).json({message: "Error retrieving profile", error});
    }
}
