
const BookMark = require("../models/bookmark");
module.exports = {
    createBookmark: async (req, res) => {
        const newBookmark = new BookMark(req.body);
        try {
            const savedBookmark = await newBookmark.save();
            const { __v, createdAt, updateAt, ...newBookmarkedInfo } = savedBookmark._doc;
            res.status(200).json(newBookmarkedInfo);
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
            const bookmarks = await BookMark.find({ userId: req.params.id})
            
            res.status(200).json(bookmarks);

        } catch (error) {
            res.status(403).json({ "status": "Faild to get the bookmarks", "message": error.message })
        }
    },

}