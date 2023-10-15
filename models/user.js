const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        useremail: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        location: { type: String, required: true },
        isAdmin: { type: Boolean, default: true },
        isAgent: { type: Boolean, default: false },
        skills: { type: Array, default: false },
        profile: { type: String, required: true, 
            default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" },

    }, 
    
    { timestamps: true }

    );

module.exports = mongoose.model("User", userSchema);