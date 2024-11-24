import jwt from "jsonwebtoken"

const generateToken = (userID, res) =>{
    const token = jwt.sign({userID}, '4f8d5b9d8a7c2e6f3d5a9b8c1d3e7a6f9c4b8d2e7c5a6b9d4e7f3a8b6c5d9e2'
        , {
        expiresIn: '7d'
    })
    
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export default generateToken;