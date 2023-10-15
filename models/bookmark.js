const mongoose = require("mongoose");
const BookmarkSchema = new mongoose.Schema(
    {
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        userId: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema)
