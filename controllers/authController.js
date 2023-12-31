const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken");
module.exports = {
    //regiser user
    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            useremail: req.body.useremail,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        
        })
        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ useremail: req.body.useremail });
    
            if (!user) {
                return res.status(401).json("User not found");
            }
    
            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const depassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
    
            if (depassword !== req.body.password) {
                return res.status(401).json("Wrong Password");
            }
    
            const { password, __v, createdAt, updatedAt, ...others } = user._doc;
            const userToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
                isAgent: user.isAgent,
            }, process.env.JWTSEC, {
                expiresIn: "21d"
            });
    
            res.status(200).json({ ...others, userToken });
        } catch (error) {
            // Handle errors gracefully and send an error response
            res.status(500).json(error.message);
        }
    }
    
    

}

