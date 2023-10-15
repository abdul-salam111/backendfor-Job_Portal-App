
const BookMark = require("../models/bookmark");
const Job = require("../models/job");
module.exports = {
    createBookmark: async (req, res) => {
        const jobId = req.body.job;
        try {
            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json("Job does not exist.");
            }
            const newBook = new BookMark({ job: job,userId:req.user.id});
            const savedBookmark=await newBook.save();
            const {__v,createdAt,updatedAt,...newBookmarInfo}=savedBookmark._doc;
            res.status(200).json(newBookmarInfo);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    deleteBookmark: async (req, res) => {
        try {
            await BookMark.findByIdAndDelete(req.params.id);
            res.status(200).json("Bookmark Deleted!");

        } catch (error) {
            res.status(403).json({ "status": "Faild to delete Bookkmark", "message": error.message })
        }
    },
    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await BookMark.find({ userId: req.params.id })

            res.status(200).json(bookmarks);

        } catch (error) {
            res.status(403).json({ "status": "Faild to get the bookmarks", "message": error.message })
        }
    },

}