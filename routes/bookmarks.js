const routers=require("express").Router();
const BookmarksController=require("../controllers/bookmarks");
const { verifyAndAuthorizeToken } = require("../middlewares/verifytoken");

//create BookMark
routers.post('/createBookmark',BookmarksController.createBookmark);

//detele bookmark
routers.delete('/deleteBookmark/:id',BookmarksController.deleteBookmark);

//get bookmark
routers.get('/getBookmark/:id',BookmarksController.getBookmarks);
 


module.exports=routers;
