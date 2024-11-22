export const signup = async(req, res) =>{
    try {
        const {firstName, lastName, username, password, confirmPassword, gender} = req.body;
    } catch (error) {
        
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