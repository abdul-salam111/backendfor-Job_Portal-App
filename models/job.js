const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        location: { type: String, required: true },
        company: { type: String, required: true },
        description: { type: String, required: true },
        salary: { type: String, required: true },
        period: { type: String, required: true },
        hiring:{type:Boolean,required:true},
        contract: { type: String, required: true },
        requirements: { type: Array, required: true },
        imageUrl: { type: String, required: true },
        agentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    }, 
    { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);