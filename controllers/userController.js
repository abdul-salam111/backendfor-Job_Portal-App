const User = require("../models/user");
const CryptoJS = require("crypto-js");

module.exports = {
    updateUser: async (req, res) => {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            const {password,__v,createdAt,...others}=updateUser._doc;
            res.status(200).json({...others});
        } catch (error) {
                res.status(201).json(error.message);
        }
    },

    deleteUser:async (req,res)=>{
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account Deleted!");

        } catch (error) {
            res.status(403).json("Faild to delete user")
        }
    },

    getUsers:async (req,res)=>{
        try {
           const user= await User.findById(req.params.id);
           const {password,__v,createdAt,...userData}=user._doc;
            res.status(200).json(userData);

        } catch (error) {
            res.status(403).json("Faild to get the users")
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ "message": "Internal server error" });
        }
    }


}